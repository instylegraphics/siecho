from django.urls import path
from rest_framework import routers
from si.api import (TournamentViewSet, SeriesViewSet, SceneViewSet, TeamViewSet, PlayerViewSet,
                    GameFactionViewSet, MatchViewSet, PlayerStatsViewSet, GameViewSet, GameModeViewSet, GameMapViewSet)


router = routers.DefaultRouter()
router.register('si/tournament', TournamentViewSet, 'tournament')
router.register('si/series', SeriesViewSet, 'series')
router.register('si/scene', SceneViewSet, 'scene')
router.register('si/team', TeamViewSet, 'team')
router.register('si/player', PlayerViewSet, 'player')
router.register('si/gamefaction', GameFactionViewSet, 'gamefaction')
router.register('si/match', MatchViewSet, 'teams')
router.register('si/playerstats', PlayerStatsViewSet, 'playerstats')
router.register('si/game', GameViewSet, 'game')
router.register('si/gamemode', GameModeViewSet, 'gamemode')
router.register('si/gamemap', GameMapViewSet, 'gamemap')

urlpatterns = router.urls
