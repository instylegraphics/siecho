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
    htmlcolorvalue = models.CharField(max_length=10, blank=True, null=True)
    enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Map(models.Model):

    name = models.CharField(max_length=50)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.name


class Tournament(models.Model):

    name = models.CharField(max_length=100)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    producer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name='producer')
    coproducer_one = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name='coproducer_one', blank=True, null=True)
    coproducer_two = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, related_name='coproducer_two', blank=True, null=True)
    scheduled_date = models.DateTimeField()
    img = models.ImageField(blank=True, null=True)
    enabled = models.BooleanField(default=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return '{} - {}'.format(self.tournament.name, self.name)

    class Meta:
        ordering = ['scheduled_date']


class Scene(models.Model):

    name = models.CharField(max_length=255)
    tournament = models.ForeignKey(
        Tournament, on_delete=models.CASCADE, related_name='tournament')
    img = models.ImageField(blank=True, null=True)
    controls = models.CharField(max_length=255, blank=True, null=True)
    enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Team(models.Model):

    name = models.CharField(max_length=50)
    short_name = models.CharField(max_length=8)
    logo = models.ImageField(blank=True, null=True)
    enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Player(models.Model):

    username = models.CharField(max_length=50)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    team = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, related_name='team')
    is_captain = models.BooleanField(default=False)
    enabled = models.BooleanField(default=True)
    wins = models.PositiveIntegerField(default=0)
    losses = models.PositiveIntegerField(default=0)

    def __str__(self):
        return '[{}] {}'.format(self.team.short_name, self.username)


class Series(models.Model):

    name = models.CharField(max_length=100)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    series_order = models.PositiveIntegerField(default=1)
    team_one = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, related_name='series_team_one')
    team_one_score = models.PositiveIntegerField(default=0)
    team_two = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, related_name='series_team_two')
    team_two_score = models.PositiveIntegerField(default=0)
    winner = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, blank=True, null=True)
    best_of = models.PositiveIntegerField(default=5)
    active = models.BooleanField(default=False)
    ended = models.BooleanField(default=False)

    def __str__(self):
        return '{} vs {} - BO{}'.format(
            self.team_one.name, self.team_two.name, self.best_of)


class Match(models.Model):

    series = models.ForeignKey(Series, on_delete=models.CASCADE)
    map = models.ForeignKey(Map, on_delete=models.DO_NOTHING)
    gamemode = models.ForeignKey(
        GameMode, on_delete=models.DO_NOTHING, null=True)
    match_order = models.PositiveIntegerField(default=1)
    roomcode = models.CharField(max_length=50)
    team_one = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, related_name='team_1')
    team_one_score = models.PositiveIntegerField(default=0)
    team_one_faction = models.ForeignKey(
        GameFaction, on_delete=models.DO_NOTHING, null=True, related_name='team_1side')
    team_two = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, related_name='team_2')
    team_two_score = models.PositiveIntegerField(default=0)
    team_two_faction = models.ForeignKey(
        GameFaction, on_delete=models.DO_NOTHING, null=True, related_name='team_2side')
    winner = models.ForeignKey(
        Team, on_delete=models.DO_NOTHING, blank=True, null=True)
    active = models.BooleanField(default=False)
    ended = models.BooleanField(default=False)

    class Meta:
        ordering = ['match_order']

    def __str__(self):
        return '{} - Match {}'.format(self.series, self.match_order)


class PlayerStats(models.Model):

    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    kills = models.PositiveIntegerField(default=0)
    deaths = models.PositiveIntegerField(default=0)
    assist = models.PositiveIntegerField(default=0)
    goals = models.PositiveIntegerField(default=0)
    grabs = models.PositiveIntegerField(default=0)
    drops = models.PositiveIntegerField(default=0)
    wins = models.PositiveIntegerField(default=0)
    losses = models.PositiveIntegerField(default=0)
    gamesplayed = models.PositiveIntegerField(default=0)
    gamemode = models.ForeignKey(GameMode, on_delete=models.CASCADE)
    gamemap = models.ForeignKey(Map, on_delete=models.CASCADE)

    def __str__(self):
        return self.player.username
