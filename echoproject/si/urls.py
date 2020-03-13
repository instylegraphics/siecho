from django.urls import path
from rest_framework import routers
from si.api import (TournamentViewSet, TournamentGetViewSet, SeriesViewSet, SeriesGetViewSet, SceneViewSet, TeamViewSet, PlayerViewSet,
                    GameFactionViewSet, MatchViewSet, MatchGetViewSet, PlayerStatsViewSet, GameViewSet, GameModeViewSet, GameMapViewSet)


router = routers.DefaultRouter()
router.register('si/tournament', TournamentViewSet, 'tournament')
router.register('si/tournamentget', TournamentGetViewSet, 'tournamentget')
router.register('si/series', SeriesViewSet, 'series')
router.register('si/seriesget', SeriesGetViewSet, 'seriesget')
router.register('si/scene', SceneViewSet, 'scene')
router.register('si/team', TeamViewSet, 'team')
router.register('si/player', PlayerViewSet, 'player')
router.register('si/gamefaction', GameFactionViewSet, 'gamefaction')
router.register('si/match', MatchViewSet, 'match')
router.register('si/matchget', MatchGetViewSet, 'matchget')
router.register('si/playerstats', PlayerStatsViewSet, 'playerstats')
router.register('si/game', GameViewSet, 'game')
router.register('si/gamemode', GameModeViewSet, 'gamemode')
router.register('si/gamemap', GameMapViewSet, 'gamemap')

urlpatterns = router.urls
