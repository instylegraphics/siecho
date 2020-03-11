from django.urls import path
from rest_framework import routers
from si.api import ( TournamentViewSet, SeriesViewSet, SceneViewSet, TeamViewSet, PlayerViewSet,
                    GameFactionViewSet, MatchViewSet, PlayerStatsViewSet, GameViewSet, GameModeViewSet, MapViewSet)


router = routers.DefaultRouter()
router.register('api/tournament', TournamentViewSet, 'tournament')
router.register('api/series', SeriesViewSet, 'series')
router.register('api/scene', SceneViewSet, 'scene')
router.register('api/team', TeamViewSet, 'team')
router.register('api/player', PlayerViewSet, 'player')
router.register('api/gamefaction', GameFactionViewSet, 'gamefaction')
router.register('api/match', MatchViewSet, 'teams')
router.register('api/playerstats', PlayerStatsViewSet, 'playerstats')
router.register('api/game', GameViewSet, 'game')
router.register('api/gamemode', GameModeViewSet, 'gamemode')
router.register('api/map', MapViewSet, 'map')

urlpatterns = router.urls
