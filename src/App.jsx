const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function removeIssue(issue){
  console.log("I'm removeIssue");
  const query = `mutation Delete($issue: IssueDeletes!){
    Delete(issue: $issue) {
      id
    }
  }`;
  const data = await graphQLFetch(query, { issue });
  window.location.reload();
}

function handleRemove(issue, e) {
  e.preventDefault();
  console.log("Delete:" + issue.id);
  removeIssue(issue);
}

function IssueRow(props) {
  const issue = props.issue;
  var index = props.index;
  index++;
  return (
    <tr>
      <td>{index}</td>
      <td>{issue.serialNumber}</td>
      <td>{issue.name}</td>
      <td>{issue.phoneNumber}</td>
      <td>{issue.created.toDateString()}</td>
      <td><button onClick={(e) => handleRemove(issue, e)}>Remove</button></td>
    </tr>
  );
}

function IssueTable(props) {
  const issueRows = props.issues.map((issue,index) =>
    <IssueRow key={issue.id} issue={issue} index={index} />
  );

  return (
    <table className="bordered-table" id="wltable">
      <thead>
        <tr>
          <th>No.</th>
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
    if(form.name.value==""||form.phoneNumber.value == ""){
      alert("Invalid input. Please enter content");
      return;
    }
    //console.log("size=" + document.getElementById("wltable").getElementsByTagName("tr").length);
    var size = document.getElementById("wltable").getElementsByTagName("tr").length;
    if(size==25){
      alert("Waitlist is full");
      return;
    }
    const issue = {
      name: form.name.value,
      phoneNumber: form.phoneNumber.value
    }
    this.props.createIssue(issue);
    form.name.value = ""; form.phoneNumber.value = "";
    this.props.decfs();
  }

  render() {
    const myAddStyle = {
      width: "300px", 
      float:"left", 
      padding: "0.5px 10px 10px 20px", 
      backgroundColor: "bisque",
      borderRadius: "10px"
    }
    return (
      <div style={myAddStyle}>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <label for="name" >Name:</label>
          <input type="text" id="name" name="name" placeholder="Name" />
          <br></br>
          <label for="phoneNumber" >Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" />
          <div className={'block'} style={{textAlign: "center"}}>
            <input type="submit" value="submit"></input>
            <input type="reset" value="reset"></input>
          </div>
        </form>
      </div>
      
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

class MyHeader extends React.Component {
  render() {
      const myHeaderStyle = {
          backgroundColor: "mistyrose",
          textAlign: "center",
          color: "saddlebrown"
      };
      return (
          <div id="header2" style={myHeaderStyle}>
              <span>
                  <h1>🏨 Home Page 🍽️ </h1>
              </span>
          </div>
      )
  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [], fs: 25};
    this.createIssue = this.createIssue.bind(this);
    this.incfs = this.incfs.bind(this);
    this.decfs = this.decfs.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      Read {
        id serialNumber name phoneNumber
        created 
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
    var num = data.issueList.length;
    console.log("num="+num);
    var newfs = 25-num;
    this.setState({ fs: newfs });
  }

  async createIssue(issue) {
    const query = `mutation Add($issue: IssueInputs!) {
      Add(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  incfs() {
    console.log("incfs");
    var newfs = this.state.fs;
    newfs++;
    this.setState({fs: newfs});
  }

  decfs() {
    var newfs = this.state.fs;
    newfs--;
    this.setState({fs: newfs});
  }

  render() {
    const myFreeSlotsStyle = {
      width: "150px", 
      float:"right", 
      backgroundColor: "gold", 
      borderRadius: "10px", 
      fontSize: "large", 
      padding: "10px 25px", 
      color:"maroon"
  }
  const myWlStyle = {
    width: "480px",
    float: "left",
    backgroundColor: "rgb(215, 191, 216)",
    borderRadius: "10px", 
    padding: "5px 20px 20px 20px", 
    textAlign: "center", 
    border:"2px solid rgb(112, 56, 79)"
}
    return (
      <React.Fragment>
        <MyHeader />
        <div style={myFreeSlotsStyle}>
          <h3>Free slots: {this.state.fs}</h3>
        </div>
        
        <IssueAdd createIssue={this.createIssue} incfs={this.incfs} decfs={this.decfs}/>
        <div style={myWlStyle}>
          <IssueTable issues={this.state.issues} fs={this.state.fs}/>
        </div>
        <span  style={{float:"left", margin: "0px 10px 10px 10px"}}>
                    <button className={'button1'}>Hide Waitlist</button>
                    <span>Total: </span>
                    <span>4</span>
            </span>
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
