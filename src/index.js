var React = require('react');
var ReactDOM = require('react-dom');

var xx = require("./build/db.js");
xx.getData(function (x) {
    ReactDOM.render(
        <table className="table table-hover">
            <th>1</th><th>2</th>
            <tr><td>{x[0]}</td><td>{x[1]}</td></tr>
        </table>, document.getElementById("example"));
});



