from django.urls import path
from base.views import challenge_views as views



urlpatterns = [
    path('', views.challenge_list, name='challenge-list'),
    path('list/', views.getChallengesList, name='getChallengesList'),
    path('reading-challenge/', views.getReadingChallengeByUser, name="getReadingChallengeByUser"),
    path('reading-challenge-create/', views.createReadingChallenge, name="reading-challenge-create"),
    path('reading-challenge-update/', views.updateReadingChallenge, name="reading-challenge-update"),
    path('reading-challenge-increment/', views.incrementReadingChallenge, name="reading-challenge-increment"),


]
