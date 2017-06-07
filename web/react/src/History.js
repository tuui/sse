import React from 'react';

class History extends React.Component {
  render() {
    return (
		<table className="table table-hover">
		    <thead>
		    <tr>
		        <th>id</th>
		        <th>eventId</th>
		        <th>betOfferId</th>
		        <th>username</th>
		        <th>stake</th>
		        <th>odds</th>
		        <th>status</th>
		        <th>placed</th>
		    </tr>
		    </thead>
		    <tbody>

		    </tbody>
		</table>
    );
  }
}

export default History;