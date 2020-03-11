from django.contrib import admin
from si.models import (Tournament, Series, Scene,
                       Team, Player, GameFaction, Match, PlayerStats, Game, GameMode, Map)


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    pass


@admin.register(GameMode)
class GameModeAdmin(admin.ModelAdmin):
    pass


@admin.register(GameFaction)
class GameFactionAdmin(admin.ModelAdmin):
    pass


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    pass


@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    pass


@admin.register(Scene)
class SceneAdmin(admin.ModelAdmin):
    pass


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    pass


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    pass


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    pass


@admin.register(Map)
class MapAdmin(admin.ModelAdmin):
    pass


@admin.register(PlayerStats)
class PlayerStatsAdmin(admin.ModelAdmin):
    pass
