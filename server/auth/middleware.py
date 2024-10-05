from django.http import JsonResponse
from firebase_admin import auth


class FirebaseAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Skip authentication for certain paths (like login or signup)
        if request.path in ['http://localhost:8000/verify_firebase_token/']:
            return self.get_response(request)

        # Get the token from the request headers
        token = request.META.get('HTTP_AUTHORIZATION')

        if token:
            # Assuming the token is sent as "Bearer <token>"
            token = token.split(' ')[1]

            try:
                decoded_token = auth.verify_id_token(token)
                # Set the user ID in the request object
                request.user_uid = decoded_token['uid']
            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=401)

        else:
            return JsonResponse({'status': 'error', 'message': 'Authorization header is missing'}, status=401)

        return self.get_response(request)
