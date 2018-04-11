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
