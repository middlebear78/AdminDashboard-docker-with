from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from firebase_admin import auth
import json  # Ensure you import the json module


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

            
            return JsonResponse({'status': 'success', 'uid': uid}, status=200)
        
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
