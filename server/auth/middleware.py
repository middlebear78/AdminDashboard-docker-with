from django.contrib.auth import get_user_model
from typing import Any
from django.http import JsonResponse
from firebase_admin import auth


class FirebaseAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        print("FirebaseAuthMiddleware initialized.")

    def __call__(self, request):
        print("FirebaseAuthMiddleware called")

        # Skip authentication for the admin page, login, and other public paths
        # if request.path_info.startswith('/admin/') or request.path_info in ['/verify_firebase_token/', '/login/', '/signup/', '/api/statistics/users']:
        #     print("Public path accessed; skipping Firebase authentication.")
        #     return self.get_response(request)
        

       
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        print("Authorization header:", auth_header)

        if auth_header:
            try:
               
                if auth_header.startswith('Bearer '):
                    token = auth_header.split(' ')[1]
                    print("Extracted token:", token)
                else:
                    print("Invalid authorization header format")
                    return JsonResponse({'status': 'error', 'message': 'Invalid authorization header format'}, status=401)

              
                decoded_token = auth.verify_id_token(token)
                print("Decoded token:", decoded_token)

                # Set the Firebase UID in the request object for later use
                request.user_uid = decoded_token['uid']
                print("User UID set:", request.user_uid)

            except Exception as e:
                print("Error verifying token:", str(e))
                return JsonResponse({'status': 'error', 'message': str(e)}, status=401)
        else:
            print("Authorization header is missing")
            return JsonResponse({'status': 'error', 'message': 'Authorization header is missing'}, status=401)

        print("Proceeding to the next middleware or view.")
        return self.get_response(request)


class AdminCheckMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        print("AdminCheckMiddleware initialized.")

    def __call__(self, request):
        print("AdminCheckMiddleware called")

        # Adjust to skip checking for admin privileges for certain paths
        if request.path_info.startswith('/admin/') or request.path_info.startswith('/public/'):
            print("Public path accessed; skipping admin check.")
            return self.get_response(request)

        # Check if user_uid exists in request (set by FirebaseAuthMiddleware)
        if hasattr(request, 'user_uid'):
            print(f"User UID found in request: {request.user_uid}")
            user = self.get_user_from_uid(request.user_uid)

            if not user:
                print(f"User not found for UID: {request.user_uid}")
                return JsonResponse({'status': 'error', 'message': 'User not found'}, status=404)

            print(f"User Role ID: {user.role_id}")

            # Check if the user is an admin
            if not self.is_user_admin(user):
                print(f"Access denied for user UID: {request.user_uid} (Role ID: {user.role_id})")
                return JsonResponse({'status': 'error', 'message': 'Access denied. Admins only.'}, status=403)
            else:
                print("Access granted; user is an admin.")
        else:
            print("User UID not set; user is not authenticated.")
            return JsonResponse({'status': 'error', 'message': 'User is not authenticated'}, status=401)

        print("Proceeding to the next middleware or view.")
        return self.get_response(request)

    def get_user_from_uid(self, uid: str):
        """
        Fetch the user from the database using the Firebase UID.
        """
        User = get_user_model()
        try:
            print(f"Fetching user for UID: {uid}")
            user = User.objects.get(firebase_uid=uid)  # Make sure 'firebase_uid' is the correct field
            print(f"User found: {user}")
            return user
        except User.DoesNotExist:
            print(f"User with UID {uid} does not exist in the database.")
            return None

    def is_user_admin(self, user) -> bool:
        """
        Check if the user's role corresponds to admin.
        Assuming role_id 2 corresponds to 'admin'.
        """
        print(f"Checking if user role is admin (Role ID: {user.role_id})")
        if user.role_id == 2:  # Ensure this value corresponds to 'admin'
            print("User is Admin!")
            return True
        else:
            print("User is not admin!")
            return False
