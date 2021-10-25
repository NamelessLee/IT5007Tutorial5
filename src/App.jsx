const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

class IssueFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the issue filter.</div>
    );
  }
}

async function removeIssue(issue){
  console.log("I'm removeIssue");
  const query = `mutation issueDelete($issue: IssueDeletes!){
    issueDelete(issue: $issue) {
      id
    }
  }`;
  const data = await graphQLFetch(query, { issue });
}

function handleRemove(issue, e) {
  e.preventDefault();
  console.log("Delete:" + issue.id);
  removeIssue(issue);
}

function IssueRow(props) {
  const issue = props.issue;
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.serialNumber}</td>
      <td>{issue.name}</td>
      <td>{issue.phoneNumber}</td>
      <td>{issue.created.toDateString()}</td>
      <td><button onClick={(e) => handleRemove(issue, e)}>Remove</button></td>
    </tr>
  );
}

function IssueTable(props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Serial Number</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Created</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      name: form.name.value,
      phoneNumber: form.phoneNumber.value
    }
    this.props.createIssue(issue);
    form.name.value = ""; form.phoneNumber.value = "";
  }

  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        <label for="name" >Name:</label>
        <input type="text" id="name" name="name" placeholder="Name" />
        <br></br>
        <label for="phoneNumber" >Phone Number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" />
        <br></br>
        <button>Add</button>
      </form>
    );
  }
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      issueList {
        id serialNumber name phoneNumber
        created 
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>California Hotel</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
