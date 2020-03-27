from django.db import models
from django.conf import settings


class Game(models.Model):

    name = models.CharField(max_length=50)
    img = models.ImageField(blank=True, null=True)
    enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class GameMode(models.Model):

    name = models.CharField(max_length=50)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    img = models.ImageField(blank=True, null=True)
    enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class GameFaction(models.Model):

    name = models.CharField(max_length=50)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    htmlcolorvalue = models.CharField(max_length=12, blank=True, null=True)
    enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class GameMap(models.Model):

    name = models.CharField(max_length=50)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.name


class Tournament(models.Model):

    name = models.CharField(max_length=100)
    game = models.ForeignKey(Game, on_delete=models.DO_NOTHING)
    producer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name='tournament_producer')
    coproducer_one = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name='tournament_coproducer_one', blank=True, null=True)
    coproducer_two = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name='tournament_coproducer_two', blank=True, null=True)
    scheduled_date = models.DateTimeField()
    img = models.ImageField(blank=True, null=True)
    enabled = models.BooleanField(default=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return '{} - {}'.format(self.game.name, self.name)

    class Meta:
        ordering = ['scheduled_date']


class Scene(models.Model):

    name = models.CharField(max_length=255)
    img = models.ImageField(blank=True, null=True)
    video = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    desc1 = models.CharField(max_length=500, blank=True, null=True)
    desc2 = models.CharField(max_length=500, blank=True, null=True)
    desc3 = models.CharField(max_length=500, blank=True, null=True)
    active = models.BooleanField(default=False)
    enabled = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name



class Team(models.Model):

    name = models.CharField(max_length=50)
    short_name = models.CharField(max_length=15)
    logo = models.ImageField(blank=True, null=True)
    enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Player(models.Model):

    username = models.CharField(max_length=50)
    firstname = models.CharField(max_length=50, blank=True, null=True)
    lastname = models.CharField(max_length=50, blank=True, null=True)
    team = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, related_name='player_team')
    is_captain = models.BooleanField(default=False, blank=True, null=True)
    enabled = models.BooleanField(default=True)
    wins = models.PositiveIntegerField(default=0, blank=True, null=True)
    losses = models.PositiveIntegerField(default=0, blank=True, null=True)

    def __str__(self):
        return '[{}] {}'.format(self.team.short_name, self.username)


class Series(models.Model):

    name = models.CharField(max_length=100)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    series_order = models.PositiveIntegerField(default=1, blank=True, null=True)
    team_one = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, related_name='series_team_one')
    team_one_score = models.PositiveIntegerField(default=0, blank=True, null=True)
    team_two = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, related_name='series_team_two')
    team_two_score = models.PositiveIntegerField(default=0, blank=True, null=True)
    winner = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, blank=True, null=True)
    best_of = models.PositiveIntegerField(default=5)
    active = models.BooleanField(default=False)
    ended = models.BooleanField(default=False)

    def __str__(self):
        return '{} - {} vs {} - Best of {}'.format(
            self.name, self.team_one.name, self.team_two.name, self.best_of)

    class Meta:
        ordering = ['series_order']
        
        
class Match(models.Model):

    series = models.ForeignKey(Series, on_delete=models.CASCADE, blank=True, null=True)
    gamemap = models.ForeignKey(GameMap, on_delete=models.DO_NOTHING, blank=True, null=True)
    gamemode = models.ForeignKey(
        GameMode, on_delete=models.DO_NOTHING, blank=True, null=True)
    match_order = models.PositiveIntegerField(default=1)
    roomcode = models.CharField(max_length=50, blank=True, null=True)
    team_one = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, related_name='match_team_one', blank=True, null=True)
    team_one_score = models.PositiveIntegerField(default=0, blank=True, null=True)
    team_one_faction = models.ForeignKey(
        GameFaction, on_delete=models.DO_NOTHING, related_name='match_team_one_faction', blank=True, null=True)
    team_two = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, related_name='match_team_two', blank=True, null=True)
    team_two_score = models.PositiveIntegerField(default=0, blank=True, null=True)
    team_two_faction = models.ForeignKey(
        GameFaction, on_delete=models.DO_NOTHING, related_name='match_team_two_faction', blank=True, null=True)
    winner = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, blank=True, null=True)
    active = models.BooleanField(default=False)
    ended = models.BooleanField(default=False)

    class Meta:
        ordering = ['match_order']

    def __str__(self):
        return '{} - {} vs {} - Match {}'.format(self.series.name, self.team_one.name, self.team_two.name, self.match_order)


class PlayerStats(models.Model):

    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    kills = models.PositiveIntegerField(default=0, blank=True, null=True)
    deaths = models.PositiveIntegerField(default=0, blank=True, null=True)
    assist = models.PositiveIntegerField(default=0, blank=True, null=True)
    goals = models.PositiveIntegerField(default=0, blank=True, null=True)
    grabs = models.PositiveIntegerField(default=0, blank=True, null=True)
    drops = models.PositiveIntegerField(default=0, blank=True, null=True)
    wins = models.PositiveIntegerField(default=0, blank=True, null=True)
    losses = models.PositiveIntegerField(default=0, blank=True, null=True)
    gamesplayed = models.PositiveIntegerField(default=0, blank=True, null=True)
    gamemode = models.ForeignKey(GameMode, on_delete=models.CASCADE, blank=True, null=True)
    gamemap = models.ForeignKey(GameMap, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.player.username