from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView


from si.models import (Tournament, Series, Scene, Team, Player, GameFaction, Match, PlayerStats, Game, GameMode, GameMap)

from si.serializers import ( TournamentSerializer, TournamentGetSerializer, SeriesSerializer, SceneSerializer, SeriesGetSerializer, TeamSerializer, PlayerSerializer, GameFactionSerializer, MatchSerializer, MatchGetSerializer, PlayerStatsSerializer, GameSerializer, GameModeSerializer, GameMapSerializer)


class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TournamentSerializer


class TournamentGetViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TournamentGetSerializer
    
    
class SeriesViewSet(viewsets.ModelViewSet):
    queryset = Series.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = SeriesSerializer


class SeriesGetViewSet(viewsets.ModelViewSet):
    queryset = Series.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = SeriesGetSerializer
    
        
class SceneViewSet(viewsets.ModelViewSet):
    queryset = Scene.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = SceneSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TeamSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = PlayerSerializer


class GameFactionViewSet(viewsets.ModelViewSet):
    queryset = GameFaction.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = GameFactionSerializer


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MatchSerializer


class MatchGetViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MatchGetSerializer
    
    
class PlayerStatsViewSet(viewsets.ModelViewSet):
    queryset = PlayerStats.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = PlayerStatsSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = GameSerializer


class GameModeViewSet(viewsets.ModelViewSet):
    queryset = GameMode.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = GameModeSerializer


class GameMapViewSet(viewsets.ModelViewSet):
    queryset = GameMap.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = GameMapSerializer
