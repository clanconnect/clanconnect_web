import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Table, Tag } from "antd";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import StatusDropdown from "../StatusDropdown";
import { useDispatch, connect } from "react-redux";
import { ACTIONS } from "redux/creators/creatives/actions";
import { convertSizeForHuman } from "helpers";
import InfluencerCreativeModal from "components/InfluencerCreativeModal";
import download from "assets/images/download.svg";

const statusTags = {
  rejected: <Tag color="#f50">Rejected</Tag>,
  pending: <Tag color="#2db7f5">Pending</Tag>,
  accepted: <Tag color="#87d068">Accepted</Tag>,
};

const CreativeTableInfluencer = ({ list, pagination }) => {
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

  const onPageChange = (pagination) => {
    setSelectedRowKeys([]);
    dispatch({
      type: ACTIONS.GET_ALL,
      payload: {
        query: {
          include: "project,media,user",
          page: pagination.current,
          perPage: pagination.pageSize,
        },
      },
    });
  };

  const columns = [
    {
      title: "Campaign Name",
      render: (a, row) => <span>{row.project.title}</span>,
      key: "projectName",
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
      render: (v, row) => (
        <span>{convertSizeForHuman(row.stats.storageSizeInBytes)}</span>
      ),
      key: "size",
    },
    {
      title: "Date",
      render: (v, row) => new Date(row.createdAt).toISOString().split("T")[0],
      key: "date",
    },
    {
      title: <StatusDropdown />,
      render: (i, row) => statusTags[row.status],
      key: "status",
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <div>
      {selectedRowKeys.length > 0 ? (
        <div className="added-row">
          <div>
            <p className="mb-0 added-row-text">
              {selectedRowKeys.length} rows selected:
            </p>
          </div>
          <div>
            <button className="delete-btn">
              <DeleteOutlined /> Delete
            </button>
            <button className="delete-btn bg-download">
              <DownloadOutlined /> Download
            </button>
          </div>
        </div>
      ) : null}
      <Table
        bordered
        columns={columns}
        dataSource={rows}
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
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
  list: CreatorCreatives.allCreatives.list,
  pagination: CreatorCreatives.allCreatives.pagination,
});

export default connect(mapStateToProps)(CreativeTableInfluencer);
