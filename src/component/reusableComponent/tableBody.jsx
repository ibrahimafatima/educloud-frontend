import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import auth from "../../services/authService";

class TableBody extends Component {
  renderColumn(element, column) {
    if (column.content) return column.content(element["className"]);
    if (column.teacher) return column.teacher(element["teacherID"]);
    if (column.payment) return column.payment(element["registration_number"]);
    if (column.value) return column.value(element);
    if (column.path === "schedule_date")
      return <Moment format="Do MMMM YYYY">{element[column.path]}</Moment>;
    return element[column.path];
  }
  render() {
    const { columns, elements, routePath } = this.props;
    return (
      <tbody>
        {elements.map(element => (
          <tr key={element._id}>
            {columns.map(column =>
              (column.path === "name" && !auth.getCurrentUser().isStudent) ||
              column.path === "username" ||
              (column.path === "className" &&
                !auth.getCurrentUser().isStudent) ||
              column.path === "post_date" ||
              column.path === "_id" ? (
                <td key={column.path + element._id}>
                  <Link to={`/${routePath}/${element._id}`}>
                    {element[column.path]}
                  </Link>{" "}
                </td>
              ) : (
                <td key={column.path + element._id}>
                  {this.renderColumn(element, column)}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
