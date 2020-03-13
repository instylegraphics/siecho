from rest_framework import serializers

from si.models import (Tournament, Series, Scene,
                       Team, Player, GameFaction, Match, PlayerStats, Game, GameMode, GameMap)


class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'


class SceneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scene
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'


class GameFactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameFaction
        fields = '__all__'


class PlayerStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerStats
        fields = '__all__'


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class GameModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameMode
        fields = '__all__'


class GameMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameMap
        fields = '__all__'


class SeriesSerializer(serializers.ModelSerializer):
    
    tournament = TournamentSerializer(read_only=True)
    team_one = TeamSerializer(read_only=True)
    team_two = TeamSerializer(read_only=True)
    
    class Meta:
        model = Series
        fields = '__all__'
        
class MatchSerializer(serializers.ModelSerializer):

    series = SeriesSerializer(read_only=True)
    gamemap = GameMapSerializer(read_only=True) 
    gamemode = GameModeSerializer(read_only=True) 
    team_one = TeamSerializer(read_only=True)
    team_one_faction = GameFactionSerializer(read_only=True) 
    team_two = TeamSerializer(read_only=True)
    team_two_faction = GameFactionSerializer(read_only=True)  
    winner = TeamSerializer(read_only=True)
    
    class Meta:
        model = Match
        fields = '__all__'