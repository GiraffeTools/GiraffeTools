import functools, json, pydash, urllib.error, urllib.request, yaml

class GiraffeConfig:

    def __init__(self, ghuser='', ghrepo='', ghbranch='master'):
        self.ghuser = ghuser
        self.ghrepo = ghrepo
        self.ghbranch = ghbranch
        self.giturl = f"https://raw.githubusercontent.com/{ghuser}/{ghrepo}/{ghbranch}/GIRAFFE.yml"
        with urllib.request.urlopen(self.giturl) as url:
            self.data = yaml.load(url.read().decode())

    @property
    def tools(self):
        definedTools = self.data.get('tools', {})
        return functools.reduce(
            lambda toolsList, toolName:
                toolsList + [[toolName, self.getToolPath(toolName)]],
            definedTools,
            []
        )

    def getToolPath(self, toolName):
        return f"/{self.ghuser}/{self.ghrepo}/{self.ghbranch}/{toolName}"

    def getToolFile(self, toolName):
        return pydash.get(self.data, f"tools.{toolName}.file[0]")

    def getToolFileData(self, toolName):
        filePath = self.getToolFile(toolName)
        fileUrl = f"https://raw.githubusercontent.com/{self.ghuser}/{self.ghrepo}/{self.ghbranch}/{filePath}"
        try:
            with urllib.request.urlopen(fileUrl) as url:
                fileData = json.loads(url.read().decode())
        except (urllib.error.HTTPError, ValueError):
            fileData = None
        return fileData

