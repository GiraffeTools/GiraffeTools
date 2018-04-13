from django.db import models
from django.contrib.postgres.fields import JSONField

import functools, json, pydash, urllib.error, urllib.request, yaml

class GiraffeProject:

    def __init__(self, ghuser='', ghrepo='', ghbranch='master'):
        self.ghuser = ghuser
        self.ghrepo = ghrepo
        self.ghbranch = ghbranch
        self.giturl = f"https://raw.githubusercontent.com/{ghuser}/{ghrepo}/{ghbranch}/"
        with urllib.request.urlopen(self.giturl + "GIRAFFE.yml") as url:
            self.config = yaml.load(url.read().decode())

    @property
    def tools(self):
        definedTools = self.config.get('tools', {})
        return functools.reduce(
            lambda toolsList, toolName:
                toolsList + [[toolName, self.getToolPath(toolName)]],
                definedTools,
                [])

    def getToolPath(self, toolName):
        return f"/{self.ghuser}/{self.ghrepo}/{self.ghbranch}/{toolName}"

    def getToolAttribute(self, toolName, attribute):
        return pydash.get(self.config, f"tools.{toolName}.{attribute}")

    def getToolFileData(self, toolName):
        filePath = self.getToolAttribute(toolName, 'file')[0]
        fileUrl = f"https://raw.githubusercontent.com/{self.ghuser}/{self.ghrepo}/{self.ghbranch}/{filePath}"
        try:
            with urllib.request.urlopen(fileUrl) as url:
                fileData = json.loads(url.read().decode())
        except (urllib.error.HTTPError, ValueError):
            fileData = None
        return fileData


def get_time():
    return localtime(timezone.now())

class SuperModel(models.Model):
    """Define the base abstract model."""

    class Meta:
        """Define the model metadata."""

        abstract = True

    created_on = models.DateTimeField(null=False, default=get_time, db_index=True)
    modified_on = models.DateTimeField(null=False, default=get_time)

    def save(self, *args, **kwargs):
        self.modified_on = get_time()
        return super(SuperModel, self).save(*args, **kwargs)



class Profile(SuperModel):
    """Define the structure of the user profile."""

    data = JSONField()
    handle = models.CharField(max_length=255, db_index=True)
    last_sync_date = models.DateTimeField(null=True)
    email = models.CharField(max_length=255, blank=True, db_index=True)
    github_access_token = models.CharField(max_length=255, blank=True, db_index=True)

    _sample_data = '''
        {
          "public_repos": 9,
          "site_admin": false,
          "updated_at": "2017-10-09T22:55:57Z",
          "gravatar_id": "",
          "hireable": null,
          "id": 30044474,
          "followers_url": "https:\/\/api.github.com\/users\/gitcoinco\/followers",
          "following_url": "https:\/\/api.github.com\/users\/gitcoinco\/following{\/other_user}",
          "blog": "https:\/\/gitcoin.co",
          "followers": 0,
          "location": "Boulder, CO",
          "type": "Organization",
          "email": "founders@gitcoin.co",
          "bio": "Push Open Source Forward.",
          "gists_url": "https:\/\/api.github.com\/users\/gitcoinco\/gists{\/gist_id}",
          "company": null,
          "events_url": "https:\/\/api.github.com\/users\/gitcoinco\/events{\/privacy}",
          "html_url": "https:\/\/github.com\/gitcoinco",
          "subscriptions_url": "https:\/\/api.github.com\/users\/gitcoinco\/subscriptions",
          "received_events_url": "https:\/\/api.github.com\/users\/gitcoinco\/received_events",
          "starred_url": "https:\/\/api.github.com\/users\/gitcoinco\/starred{\/owner}{\/repo}",
          "public_gists": 0,
          "name": "Gitcoin Core",
          "organizations_url": "https:\/\/api.github.com\/users\/gitcoinco\/orgs",
          "url": "https:\/\/api.github.com\/users\/gitcoinco",
          "created_at": "2017-07-10T10:50:51Z",
          "avatar_url": "https:\/\/avatars1.githubusercontent.com\/u\/30044474?v=4",
          "repos_url": "https:\/\/api.github.com\/users\/gitcoinco\/repos",
          "following": 0,
          "login": "gitcoinco"
        }
    '''
    repos_data = JSONField(default={})

    _sample_data = '''
    [
      {
        "issues_url": "https:\/\/api.github.com\/repos\/gitcoinco\/chrome_ext\/issues{\/number}",
        "deployments_url": "https:\/\/api.github.com\/repos\/gitcoinco\/chrome_ext\/deployments",
        "has_wiki": true,
        "forks_url": "https:\/\/api.github.com\/repos\/gitcoinco\/chrome_ext\/forks",
        "mirror_url": null,
        "issue_events_url": "https:\/\/api.github.com\/repos\/gitcoinco\/chrome_ext\/issues\/events{\/number}",
        "stargazers_count": 1,
        "subscription_url": "https:\/\/api.github.com\/repos\/gitcoinco\/chrome_ext\/subscription",
        "merges_url": "https:\/\/api.github.com\/repos\/gitcoinco\/chrome_ext\/merges",
        "has_pages": false,
        "updated_at": "2017-09-25T11:39:03Z",
        "private": false,
        "pulls_url": "https:\/\/api.github.com\/repos\/gitcoinco\/chrome_ext\/pulls{\/number}",
        "issue_comment_url": "https:\/\/api.github.com\/repos\/gitcoinco\/chrome_ext\/issues\/comments{\/number}",
        "full_name": "gitcoinco\/chrome_ext",
        "owner": {
          "following_url": "https:\/\/api.github.com\/users\/gitcoinco\/following{\/other_user}",
          "events_url": "https:\/\/api.github.com\/users\/gitcoinco\/events{\/privacy}",
          "organizations_url": "https:\/\/api.github.com\/users\/gitcoinco\/orgs",
          "url": "https:\/\/api.github.com\/users\/gitcoinco",
          "gists_url": "https:\/\/api.github.com\/users\/gitcoinco\/gists{\/gist_id}",
          "html_url": "https:\/\/github.com\/gitcoinco",
          "subscriptions_url": "https:\/\/api.github.com\/users\/gitcoinco\/subscriptions",
          "avatar_url": "https:\/\/avatars1.githubusercontent.com\/u\/30044474?v=4",
          "repos_url": "https:\/\/api.github.com\/users\/gitcoinco\/repos",
          "received_events_url": "https:\/\/api.github.com\/users\/gitcoinco\/received_events",
          "gravatar_id": "",
          "starred_url": "https:\/\/api.github.com\/users\/gitcoinco\/starred{\/owner}{\/repo}",
          "site_admin": false,
          "login": "gitcoinco",
          "type": "Organization",
          "id": 30044474,
          "followers_url": "https:\/\/api.github.com\/users\/gitcoinco\/followers"
        },
        ...
    ]
    '''

    @property
    def is_org(self):
        return self.data['type'] == 'Organization'

    @property
    def bounties(self):
        fulfilled_bounty_ids = self.fulfilled.all().values_list('bounty_id')
        bounties = Bounty.objects.filter(github_url__istartswith=self.github_url, current_bounty=True)
        for interested in self.interested.all():
            bounties = bounties | Bounty.objects.filter(interested=interested, current_bounty=True)
        bounties = bounties | Bounty.objects.filter(pk__in=fulfilled_bounty_ids, current_bounty=True)
        bounties = bounties | Bounty.objects.filter(bounty_owner_github_username__iexact=self.handle, current_bounty=True) | Bounty.objects.filter(bounty_owner_github_username__iexact="@" + self.handle, current_bounty=True)
        bounties = bounties | Bounty.objects.filter(github_url__in=[url for url in self.tips.values_list('github_url', flat=True)], current_bounty=True)
        return bounties.order_by('-web3_created')

    @property
    def tips(self):
        on_repo = Tip.objects.filter(github_url__startswith=self.github_url).order_by('-id')
        tipped_for = Tip.objects.filter(username__iexact=self.handle).order_by('-id')
        return on_repo | tipped_for

    @property
    def authors(self):
        auto_include_contributors_with_count_gt = 40
        limit_to_num = 10

        _return = []

        for repo in sorted(self.repos_data, key=lambda repo: repo.get('contributions', -1), reverse=True):
            for c in repo.get('contributors', []):
                if isinstance(c, dict) and c.get('contributions', 0) > auto_include_contributors_with_count_gt:
                    _return.append(c['login'])

        include_gitcoin_users = len(_return) < limit_to_num
        if include_gitcoin_users:
            for b in self.bounties:
                vals = [b.bounty_owner_github_username]
                for val in vals:
                    if val:
                        _return.append(val.lstrip('@'))
            for t in self.tips:
                vals = [t.username]
                for val in vals:
                    if val:
                        _return.append(val.lstrip('@'))
        _return = list(set(_return))
        _return.sort()
        return _return[:limit_to_num]

    @property
    def desc(self):
        stats = self.stats
        role = stats[0][0]
        total_funded_participated = stats[1][0]
        plural = 's' if total_funded_participated != 1 else ''
        return "@{} is a {} who has participated in {} funded issue{} on Gitcoin".format(self.handle, role, total_funded_participated, plural)

    @property
    def stats(self):
        bounties = self.bounties
        loyalty_rate = 0
        claimees = []
        total_funded = sum([bounty.value_in_usdt if bounty.value_in_usdt else 0 for bounty in bounties if bounty.is_funder(self.handle)])
        total_fulfilled = sum([bounty.value_in_usdt if bounty.value_in_usdt else 0 for bounty in bounties if bounty.is_hunter(self.handle)])
        print(total_funded, total_fulfilled)
        role = 'newbie'
        if total_funded > total_fulfilled:
            role = 'funder'
        elif total_funded < total_fulfilled:
            role = 'coder'

        loyalty_rate = self.fulfilled.filter(accepted=True).count()
        success_rate = 0
        if bounties.exists():
            numer = bounties.filter(idx_status__in=['submitted', 'started', 'done']).count()
            denom = bounties.exclude(idx_status__in=['open']).count()
            success_rate = int(round(numer * 1.0 / denom, 2) * 100) if denom != 0 else 'N/A'
        if success_rate == 0:
            success_rate = 'N/A'
            loyalty_rate = 'N/A'
        else:
            success_rate = "{}%".format(success_rate)
            loyalty_rate = "{}x".format(loyalty_rate)
        if role == 'newbie':
            return [
                (role, 'Status'),
                (bounties.count(), 'Total Funded Issues'),
                (bounties.filter(idx_status='open').count(), 'Open Funded Issues'),
                (loyalty_rate, 'Loyalty Rate'),
            ]
        elif role == 'coder':
            return [
                (role, 'Primary Role'),
                (bounties.count(), 'Total Funded Issues'),
                (success_rate, 'Success Rate'),
                (loyalty_rate, 'Loyalty Rate'),
            ]
        # funder
        return [
            (role, 'Primary Role'),
            (bounties.count(), 'Total Funded Issues'),
            (bounties.filter(idx_status='open').count(), 'Open Funded Issues'),
            (success_rate, 'Success Rate'),
        ]

    @property
    def github_url(self):
        return "https://github.com/{}".format(self.handle)

    @property
    def local_avatar_url(self):
        return f"{settings.BASE_URL}funding/avatar?repo={self.github_url}&v=3"

    @property
    def absolute_url(self):
        return self.get_absolute_url()

    def is_github_token_valid(self):
        """Check whether or not a Github OAuth token is valid.

        Args:
            access_token (str): The Github OAuth token.

        Returns:
            bool: Whether or not the provided OAuth token is valid.

        """
        if not self.github_access_token:
            return False

        _params = build_auth_dict(self.github_access_token)
        url = TOKEN_URL.format(**_params)
        response = requests.get(
            url,
            auth=(_params['client_id'], _params['client_secret']),
            headers=HEADERS)

        if response.status_code == 200:
            return True
        return False

    def __str__(self):
        return self.handle

    def get_relative_url(self, preceding_slash=True):
        return "{}profile/{}".format('/' if preceding_slash else '', self.handle)

    def get_absolute_url(self):
        return settings.BASE_URL + self.get_relative_url(preceding_slash=False)

class UserAction(SuperModel):
    """Records Actions that a user has taken ."""

    ACTION_TYPES = [
        ('Login', 'Login'),
        ('Logout', 'Logout'),
    ]
    action = models.CharField(max_length=50, choices=ACTION_TYPES)
    profile = models.ForeignKey('giraffe.Profile', related_name='actions', on_delete=models.CASCADE)
    metadata = JSONField(default={})

    def __str__(self):
        return "{} by {} at {}".format(self.action, self.profile, self.created_on)
