import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Table, Tag } from "antd";
import { useDispatch, connect } from "react-redux";
import { ACTIONS } from "redux/creators/creatives/actions";
import { convertSizeForHuman } from "helpers";
import InfluencerCreativeModal from "components/InfluencerCreativeModal";
import download from "assets/images/download.svg";

const statusTags = {
  rejected: <Tag color="#f50">Rejected</Tag>,
  pending: <Tag color="#2db7f5">Pending</Tag>,
  accepted: <Tag color="#87d068">Approved</Tag>,
};

const CreativeTableInfluencer = ({ list, pagination, loading }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ACTIONS.GET_ALL,
      payload: { query: { include: "project,media,user" } },
    });
  }, [dispatch]);

  useEffect(() => {
    const rows = [];
    let index = 0;
    for (const item of list) {
      rows.push({ ...item, key: index });
      index++;
    }
    setRows([...rows]);
  }, [list]);

  const onPageChange = (pagination, filters, sorter = {}) => {
    let sortOrder = {};
    if (Array.isArray(sorter)) {
      sorter.forEach((s) => (sortOrder[s.columnKey] = s.order));
    } else {
      if (Object.keys(sorter).length > 1)
        sortOrder[sorter.columnKey] = sorter.order;
    }
    dispatch({
      type: ACTIONS.GET_ALL,
      payload: {
        query: {
          include: "project,media,user",
          page: pagination.current,
          perPage: pagination.pageSize,
          status: (filters?.status || []).join(","),
          sortOrder: JSON.stringify(sortOrder),
        },
      },
    });
  };

  const columns = [
    {
      title: "Campaign Name",
      render: (a, row) => <span>{row.project.title}</span>,
      key: "projectName",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Posts",
      dataIndex: "posts",
      render: (i, row) => (
        <InfluencerCreativeModal
          project={row.project}
          creative={row}
          src={download}
          compactView={true}
        />
      ),
    },
    {
      title: "Size",
      render: (v, row) => {
        console.log(v);
        return (
          <span>
            {convertSizeForHuman(
              v?.media?.map((item) => item.size).reduce((a, b) => a + b, 0)
            )}
          </span>
        );
        // <span>{convertSizeForHuman(row.stats.storageSizeInBytes)}</span>
      },
      key: "storageSize",
      sorter: { multiple: 1 },
    },
    {
      title: "Date",
      render: (v, row) => new Date(row.createdAt).toISOString().split("T")[0],
      key: "createdAt",
      sorter: { multiple: 2 },
    },
    {
      title: "Status",
      render: (i, row) => statusTags[row.status],
      key: "status",
      filterMultiple: false,
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Approved", value: "accepted" },
        { text: "Rejected", value: "rejected" },
      ],
    },
  ];

  console.log("loading ====> ", loading);
  return (
    <div>
      {/* {selectedRowKeys.length > 0 ? (
        <div className="added-row">
          <div>
            <p className="mb-0 added-row-text">
              {selectedRowKeys.length} row(s) selected
            </p>
          </div>
          <div>
            <button
              className="delete-btn"
              onClick={deleteCreatives}
              disabled={!!!selectedRowKeys.length}
            >
              <DeleteOutlined /> Delete
            </button>
            <button className="delete-btn bg-download">
              <DownloadOutlined /> Download
            </button>
          </div>
        </div>
      ) : null} */}
      <Table
        bordered
        loading={loading}
        columns={columns}
        dataSource={rows}
        // rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        onChange={onPageChange}
        pagination={{
          hideOnSinglePage: true,
          total: pagination.total,
          current: pagination.page,
          pageSize: pagination.perPage,
          defaultCurrent: 1,
        }}
      />
    </div>
  );
};

const mapStateToProps = ({ CreatorCreatives }) => ({
  loading: CreatorCreatives.loading,
  list: CreatorCreatives.allCreatives.list,
  pagination: CreatorCreatives.allCreatives.pagination,
});

export default connect(mapStateToProps)(CreativeTableInfluencer);
