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
            token = body.get('token')
            if not token:
                return JsonResponse({'status': 'error', 'message': 'Token is required'}, status=400)

            decoded_token = auth.verify_id_token(token)
            uid = decoded_token['uid']
            email = decoded_token.get('email')
            display_name = decoded_token.get('name')

            try:
                email = decoded_token.get('email')
                user = User.objects.get(email=email)
                user_info = {
                    'user_id': user.user_id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': user.role_id
                }
                print(user_info)
            except User.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'User not found in the database'}, status=404)

            return JsonResponse({'status': 'success', 'user_info': user_info}, status=200)

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


@csrf_exempt
def check_admin(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            token = body.get('token')
            if not token:
                return JsonResponse({'status': 'error', 'message': 'Token is required'}, status=400)

            # Verify the Firebase ID token
            decoded_token = auth.verify_id_token(token)
            email = decoded_token.get('email')

            try:
                user = User.objects.get(email=email)
                if user.role_id == 'admin':
                    return JsonResponse({'status': 'success', 'is_admin': True}, status=200)
                else:
                    return JsonResponse({'status': 'success', 'is_admin': False}, status=200)
            except User.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'User not found'}, status=404)

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
