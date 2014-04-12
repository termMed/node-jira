JiraApi = require('./jira').JiraApi;

var jira = new JiraApi('https', 'jira.ihtsdotools.org', '', 'alopez', 'snomed11', 'latest');
var app = module.parent.exports.app;
/**
 * Query
 */

app.get('/jira/projects', function (req, res) {
    var projectList = jira.listProjects(function(error,projects){
        // Providing an id overwrites giving a query in the URL
        if (projects) {
            console.log(JSON.stringify(projects));
            res.header('Content-Type', 'application/json');
            res.send(projects);
        }else{
            res.send(404);
        }
    });
});

app.get('/jira/issueTypes', function (req, res) {
    var issueTypes = jira.listIssueTypes(function(error,issueTypes){
        // Providing an id overwrites giving a query in the URL
        if (issueTypes) {
            console.log(JSON.stringify(issueTypes));
            res.header('Content-Type', 'application/json');
            res.send(issueTypes);
        }else{
            res.send(404);
        }
    });
});


app.get('/jira/issues/:conceptId', function (req, res) {
    // Providing an id overwrites giving a query in the URL
    if (req.params.conceptId) {
        res.header('Content-Type', 'application/json');
        res.send(req.params.conceptId);
    }
    res.send(404);
});

app.post('/jira/issues',function(req,res){
    jira.addNewIssue(req.body, function(error,issue){

        if(issue){
            res.header('Content-Type', 'application/json');
            res.send(issue);
        }else{
            res.send(error.errors);
        }
    });

});

app.get('/jira/users', function (req, res) {
    //TODO: Not working
    var usersList = jira.searchUsers(function(error,usersList){
        // Providing an id overwrites giving a query in the URL
        if (usersList) {
            console.log(JSON.stringify(usersList));
            res.header('Content-Type', 'application/json');
            res.send(usersList);
        }else{
            res.send(404);
        }
    });
});