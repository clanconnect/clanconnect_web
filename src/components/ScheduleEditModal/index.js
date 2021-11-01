import "./styles.scss";
import { Modal, Form, Button, TimePicker, DatePicker } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ACTIONS } from "redux/creators/socials/youtube/actions";

const ScheduleEditModal = ({ visible, closeModal, setDateTime }) => {
  const [schedule, setSchedule] = useState({ date: "", time: "" });
  const dispatch = useDispatch();

  const handleOk = () => {
    console.log("ok");
  };

  const handleScheduleDate = (e) => {
    setSchedule({ ...schedule, date: e._d });
  };

  const handleScheduleTime = (e) => {
    setSchedule({ ...schedule, time: e._d });
  };

  const editSchedule = () => {
    setDateTime(schedule.date, schedule.time);
    dispatch({ type: ACTIONS.SET_SCHEDULE, payload: { ...schedule } });
    closeModal();
  };

  const finishFailed = () => {};

  return (
    <>
      <Modal
        title="Edit Schedule"
        visible={visible}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          layout="vertical"
          onFinish={editSchedule}
          onFinishFailed={finishFailed}
        >
          <Form.Item label="Set Date">
            <DatePicker onChange={handleScheduleDate} />
          </Form.Item>
          <Form.Item label="Set Time">
            <TimePicker
              className="ml-4"
              use12Hours
              onChange={handleScheduleTime}
              format="HH:mm"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ScheduleEditModal;
