from django.http import JsonResponse
from firebase_admin import auth


class FirebaseAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Skip authentication for the admin page, login, and other public paths
        if request.path_info.startswith('/admin/') or request.path_info in ['/verify_firebase_token/', '/login/', '/signup/']:
            return self.get_response(request)

        # Get the token from the Authorization header
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header:
            try:
                # Token is expected to be in the format: "Bearer <token>"
                if auth_header.startswith('Bearer '):
                    token = auth_header.split(' ')[1]
                else:
                    return JsonResponse({'status': 'error', 'message': 'Invalid authorization header format'}, status=401)

                # Verify the token with Firebase
                decoded_token = auth.verify_id_token(token)

                # Set the Firebase UID in the request object for later use
                request.user_uid = decoded_token['uid']

            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=401)
        else:
            return JsonResponse({'status': 'error', 'message': 'Authorization header is missing'}, status=401)

        return self.get_response(request)
