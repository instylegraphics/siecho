from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView


from si.models import (Tournament, Series, Scene,
                       Team, Player, GameFaction, Match, PlayerStats, Game, GameMode, Map)

from si.serializers import ( TournamentSerializer, SeriesSerializer, SceneSerializer, TeamSerializer, PlayerSerializer,
                            GameFactionSerializer, MatchSerializer,  PlayerStatsSerializer, GameSerializer, GameModeSerializer, MapSerializer)


class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TournamentSerializer


class SeriesViewSet(viewsets.ModelViewSet):
    queryset = Series.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SeriesSerializer


class SceneViewSet(viewsets.ModelViewSet):
    queryset = Scene.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SceneSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TeamSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PlayerSerializer


class GameFactionViewSet(viewsets.ModelViewSet):
    queryset = GameFaction.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameFactionSerializer


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MatchSerializer


class PlayerStatsViewSet(viewsets.ModelViewSet):
    queryset = PlayerStats.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PlayerStatsSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer


class GameModeViewSet(viewsets.ModelViewSet):
    queryset = GameMode.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameModeSerializer


class MapViewSet(viewsets.ModelViewSet):
    queryset = Map.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MapSerializer
