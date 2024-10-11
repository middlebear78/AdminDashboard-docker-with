from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from firebase_admin import auth
import json
# Adjust the import based on your User model's location
from users.models import User


@csrf_exempt
def verify_firebase_token(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            print(f"Request body: {body}")  # Log the request body for debugging
            token = body.get('token')
            if not token:
                return JsonResponse({'status': 'error', 'message': 'Token is required'}, status=400)

            # Verify the Firebase ID token
            decoded_token = auth.verify_id_token(token)
            print(f"Decoded token: {decoded_token}")  # Log the decoded token
            uid = decoded_token['uid']
            email = decoded_token.get('email')
            display_name = decoded_token.get('name')

            try:
                email = decoded_token.get('email')
                user = User.objects.get(email=email)
                user_info = {
                    'user_id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': user.role_id
                }
                print(f"User info: {user_info}")  # Log the user info
            except User.DoesNotExist:
                print(f"User with email {email} not found in the database")  # Log user not found
                return JsonResponse({'status': 'error', 'message': 'User not found in the database'}, status=404)

            return JsonResponse({'status': 'success', 'user_info': user_info}, status=200)

        except Exception as e:
            print(f"Error: {e}")  # Log any exception that occurs
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


@csrf_exempt
def check_admin(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            print(f"Request body: {body}")  # Log the request body for debugging
            token = body.get('token')
            if not token:
                return JsonResponse({'status': 'error', 'message': 'Token is required'}, status=400)

            # Verify the Firebase ID token
            decoded_token = auth.verify_id_token(token)
            print(f"Decoded token: {decoded_token}")  # Log the decoded token
            email = decoded_token.get('email')
            
            if not email:
                return JsonResponse({'status': 'error', 'message': 'Email not found in token'}, status=400)

            try:
                user = User.objects.get(email=email)
                print(f"Found user: {user.email}, role: {user.role_id}")  # Log found user details
                if user.role_id == 'admin':
                    print("User is admin")  # Log admin check
                    return JsonResponse({'status': 'success', 'is_admin': True}, status=200)
                else:
                    print("User is not admin")  # Log non-admin user
                    return JsonResponse({'status': 'success', 'is_admin': False}, status=200)
            except User.DoesNotExist:
                print(f"User with email {email} not found")  # Log user not found
                return JsonResponse({'status': 'error', 'message': 'User not found'}, status=404)

        except Exception as e:
            print(f"Error verifying token: {e}")  # Log any exception that occurs during token verification
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
