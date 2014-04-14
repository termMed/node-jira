JiraApi = require('./jira').JiraApi;

var jira = new JiraApi('https', 'jira.ihtsdotools.org', '', 'greynoso', 'snomed11', 'latest');
var app = module.parent.exports.app;
/**
 * Query
 */
app.get('/jira/projects', function (req, res) {
    var projectList = jira.listProjects(function (error, projects) {
        // Providing an id overwrites giving a query in the URL
        if (projects) {
            console.log(JSON.stringify(projects));
            res.header('Content-Type', 'application/json');
            res.send(projects);
        } else {
            res.send(404);
        }
    });
});

app.get('/jira/issueTypes', function (req, res) {
    var issueTypes = jira.listIssueTypes(function (error, issueTypes) {
        // Providing an id overwrites giving a query in the URL
        if (issueTypes) {
            console.log(JSON.stringify(issueTypes));
            res.header('Content-Type', 'application/json');
            res.send(issueTypes);
        } else {
            res.send(404);
        }
    });
});


app.get('/jira/issues/:project/:conceptId', function (req, res) {
    // Providing an id overwrites giving a query in the URL
    jira.findIssueCustomField(req.param("project"), 'ConceptId', req.param("conceptId"), function (error, foundIssues) {
        if (foundIssues) {
            console.log(JSON.stringify(foundIssues));
            res.header('Content-Type', 'application/json');
            res.send(foundIssues);
        } else {
            res.send(404);
        }
    });
});

app.post('/jira/issues', function (req, res) {
    req.body.fields.customfield_10570 = parseInt(req.body.fields.customfield_10570);
    jira.addNewIssue(req.body, function (error, issue) {
        if (issue) {
            res.header('Content-Type', 'application/json');
            res.send(issue);
        } else {
            res.send(error.errors);
        }
    });

});

app.get('/jira/users', function (req, res) {
    //TODO: Not working
    var usersList = jira.searchUsers(function (error, usersList) {
        // Providing an id overwrites giving a query in the URL
        if (usersList) {
            console.log(JSON.stringify(usersList));
            res.header('Content-Type', 'application/json');
            res.send(usersList);
        } else {
            res.send(404);
        }
    });
});