from rest_framework import generics

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from base.models import Challenge, ChallengeType
from base.serializers import ChallengeSerializer, ChallengeTypeSerializer



@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def challenge_list(request):
    if request.method == 'GET':
        challenges = Challenge.objects.all()
        serializer = ChallengeSerializer(challenges, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ChallengeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

@api_view(['GET'])
def getChallengesList(request):
    challenges_list = ChallengeType.objects.all()
    serializer = ChallengeTypeSerializer(challenges_list, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getReadingChallengeByUser(request):
    user = request.user
    readingChallenge = get_object_or_404(Challenge, user=user)
    serializer = ChallengeSerializer(readingChallenge, many=False)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReadingChallenge(request):
    user = request.user
    readingChallenge = ChallengeType.objects.get(id=1)

    if Challenge.objects.filter(user=user, challenge_type=readingChallenge).exists():
        return Response({"error": "You have already created a reading challenge."})

    challenge = Challenge.objects.create(
        user = user,
        challenge_type= readingChallenge,
        goal = 10,
        current_read_books = 0,
        books_read= ' ',
    )

    challenge.save()
    serializer = ChallengeSerializer(challenge, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateReadingChallenge(request):
    user = request.user
    data = request.data
    readingChallenge = get_object_or_404(Challenge, user=user)
    # readingChallenge.goal = data['goal']
    readingChallenge.books_read = readingChallenge.books_read  + ';' +  data['book']
    incrementBy = 1

    if incrementBy:
        readingChallenge.current_read_books = readingChallenge.current_read_books + incrementBy

    readingChallenge.save()
    serializer = ChallengeSerializer(readingChallenge, many=False)

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def incrementReadingChallenge(request):
    user = request.user
    readingChallenge = get_object_or_404(Challenge, user=user)
    readingChallenge.current_read_books = readingChallenge.current_read_books + 1
    readingChallenge.save()
    serializer = ChallengeSerializer(readingChallenge, many=False)

    return Response(serializer.data)


    



# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def set_challenge_goal(request, challenge_id):
#     challenge = get_object_or_404(Challenge, id=challenge_id, user=request.user)
#     goal = request.data.get('goal')
#     if goal is None:
#         return Response({'error': 'Please provide a goal for the challenge.'}, status=400)
#     challenge.goal = int(goal)
#     challenge.save()
#     return Response({'success': f'Challenge goal set to {goal}!'}, status=200)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def increment_books_read(request, challenge_id):
#     challenge = get_object_or_404(Challenge, id=challenge_id, user=request.user)
#     books_read = request.data.get('books_read')
#     increment = request.data.get('increment')
#     if increment:
#         challenge.current_read_books += int(increment)

#     if books_read:
#         challenge.books_read += f",{books_read}"
#     challenge.save()
#     return Response({'success': f'Books read incremented by {increment} total read books: {challenge.current_read_books}{books_read}!'}, status=200)


