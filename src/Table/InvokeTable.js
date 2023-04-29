import React, { useEffect } from "react";
import TableComponent from "./TableComponent";

const tableHead = [
  {
    id: "operationalMember",
    label: "Operational Member",
  },
  {
    id: "emailId",
    label: "Email Id",
  },
  {
    id: "assessments",
    label: "Assessments",
  },
  {
    id: "createdOn",
    label: "Created On",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "action",
    label: "Action",
  },
];

//Array of Object (idealy we will get this data from backend)
const rows = [
  {
    uuid: "1",
    assessments: {name:"external"},
    operationalMember:
      "jeff Hall rd Meaning rd Meaning rd Meaning rd Meaning rd Meaning rd Meaningrd Meaning rd Meaningrd Meaningvrd Meaning",
    emailId: "jeffbezoz@gmail.com",
    countryCode: "+91",
    phoneNumber: "90343242433",
    number: 89,
    status: "internal",
    createdOn: new Date().toLocaleDateString("en-GB"),
    createdBy: "rajkumar",
    updatedAt: new Date().toLocaleDateString("en-GB"),
  },
  {
    uuid: "2",
    emailId: "EdwardMeaning53@gmail.com",
    operationalMember: "Edward Meaning",
    assessments: "internal",
    createdOn: new Date().toLocaleDateString("en-GB"),
    status: "inactive",
    createdBy: "rajkumar",
    updatedAt: new Date().toLocaleDateString("en-GB"),
  },
  {
    uuid: "3",
    operationalMember: "William Johnsan bhai",
    assessments: "External",
    emailId: "WillianJohnbhai4509@gmail.com",
    createdOn: new Date().toLocaleDateString("en-GB"),
    status: "active",
    createdBy: "rajkumar",
    updatedAt: new Date().toLocaleDateString("en-GB"),
  },
  {
    uuid: "4",
    operationalMember: "harry robot son",
    emailId: "harrykakaji3209@zero.com",
    status: "active",
    assessments: "External",
    createdOn: new Date().toLocaleDateString("en-GB"),
    createdBy: "rajkumar",
    updatedAt: new Date().toLocaleDateString("en-GB"),
  },
  {
    uuid: "5",
    operationalMember: "joe biden",
    emailId: "joeBidenladen@gmail.com",
    assessments: "internal",
    createdBy: "rajkumar",
    createdOn: new Date().toLocaleDateString("en-GB"),
    status: "Inactive",
    updatedAt: new Date().toLocaleDateString("en-GB"),
  },
  {
    uuid: "7",
    operationalMember: "Edward Meaning",
    emailId: "EdwardMeaning53@gmail.com",
    updatedAt: new Date().toLocaleDateString("en-GB"),
    assessments: "internal",
    createdOn: new Date().toLocaleDateString("en-GB"),
    status: "inactive",
    createdBy: "rajkumar",
  },
  {
    uuid: "6",
    operationalMember:
      "jeff Hall rd Meaning rd Meaning rd Meaning rd Meaning rd Meaning rd Meaningrd Meaning rd Meaningrd Meaningvrd Meaning",
    assessments: "internal",
    emailId: "jeffbezoz@gmail.com",
    createdOn: new Date().toLocaleDateString("en-GB"),
    status: "active",
    createdBy: "rajkumar",
    updatedAt: new Date().toLocaleDateString("en-GB"),
  },
  {
    uuid: "9",
    operationalMember: "harry robot son",
    emailId: "harrykakaji3209@zero.com",
    assessments: "External",
    status: "active",
    createdOn: new Date().toLocaleDateString("en-GB"),
    createdBy: "rajkumar",
    updatedAt: new Date().toLocaleDateString("en-GB"),
  },
  {
    uuid: "8",
    operationalMember: "William Johnsan bhai",
    emailId: "WillianJohnbhai4509@gmail.com",
    status: "active",
    assessments: "External",
    createdOn: new Date().toLocaleDateString("en-GB"),
    createdBy: "rajkumar",
    updatedAt: new Date().toLocaleDateString("en-GB"),
  },
  {
    uuid: "10",
    operationalMember: "joe biden",
    emailId: "joeBidenladen@gmail.com",
    assessments: "internal",
    createdBy: "rajkumar",
    createdOn: new Date().toLocaleDateString("en-GB"),
    status: "Inactive",
    updatedAt: new Date().toLocaleDateString("en-GB"),
  },
  {
    uuid: "11",
    operationalMember: "joe biden",
    emailId: "joeBidenladen@gmail.com",
    assessments: "internal",
    createdBy: "rajkumar",
    createdOn: new Date().toLocaleDateString("en-GB"),
    status: "Inactive",
    updatedAt: new Date().toLocaleDateString("en-GB"),
  },
];

const InvokeTable = () => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("operationalMember");

  //   Method will invoke when there's page change
  //   you'll get updated page number as argument set this in page state
  const handleMemberListPageChange = (newPage) => {
    console.log("new Page", newPage);
    setPage(newPage);
  };

  //   Method will invoke when there's rows per page count updates
  //   you will get updated count as argument set in rowsPerPage state
  const handleMemberListRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    console.log("rows per page", value);
    setPage(1);
  };
  const viewIconClickHandler = (id) => {
    console.log("id", id);
  };

  const rowClickHandler = (id) => {
    console.log(id);
  };

  const deleteIconClickHandler = (id) => {
    console.log("member on Delete click", id);
  };

  //   Logic for pagination, no need to do it here, as we handle pagination from backend
  let records = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const tempRows = [...records];

  //   tempRows.forEach((object) => {
  //     delete object["createdBy"];
  //     delete object["updatedAt"];
  //   });
  useEffect(() => {
    // add method which will execute when there's change in one of the useEffect dependancy
    console.log("order by", orderBy, "order", order, "select", selected);
  }, [order, page, orderBy, rowsPerPage, selected]);
  return (
    <div>
      <TableComponent
        tableHead={tableHead}
        records={records}
        handlePageChange={handleMemberListPageChange}
        handleRowsPerPageChange={handleMemberListRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        totalRecords={rows.length}
        order={order}
        orderBy={orderBy}
        icons={["visibility"]}
        viewIconClickHandler={viewIconClickHandler}
        rowClickHandler={rowClickHandler}
        deleteIconClickHandler={deleteIconClickHandler}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        selected={selected}
        setSelected={setSelected}
        checkBox={true}
      />
    </div>
  );
};

export default InvokeTable;
