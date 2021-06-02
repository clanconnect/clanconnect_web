import "./styles.scss";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  message,
  Row,
} from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "redux/creators/socials/instagram/actions";

const { Option } = Select;

const InstagramUploadForm = ({
  creative,
  setIsIgFormDescriptionVisible,
  setIsIgScheduleExistForCreative,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const instagramData = useSelector((store) => store.CreatorInstagram.data);
  const fbPagesData = useSelector((store) => store.CreatorInstagram.fbPages);
  const instagramUserId = useSelector((store) => store.CreatorInstagram.igId);
  console.log("fbPagesData", fbPagesData);
  const [formSubmitted, setFormSubitted] = useState(false);

  useEffect(() => {
    if (instagramData?.creative === creative.id) {
      form.setFieldsValue({
        caption: instagramData?.caption,
        date: moment(instagramData?.liveAt),
        time: moment(instagramData?.liveAt),
      });
    }
  }, []);
  useEffect(() => {
    dispatch({
      type: ACTIONS.FETCH_FB_PAGES,
    });
  }, []);

  const handleAccountChange = (values) => {
    // const [id, name] = value.split("-:-");
    if (values?.account) {
      dispatch({
        type: ACTIONS.FETCH_IG_ID,
        payload: {
          path: {
            fbId: values.account,
          },
        },
      });
    }
  };
  const onFinish = (values) => {
    const date = moment(values.data).format("MM/DD/YY");
    const time = moment(values.time).format("HH:mm:ss");
    const liveAt = new Date(`${date} ${time}`);
    dispatch({
      type: ACTIONS.ADD_POST,
      payload: {
        body: {
          caption: values.caption,
          liveAt: liveAt.toISOString(),
          creativeId: creative.id,
          mediaId: creative.media.find((item) => item.status === "accepted").id,
          mediaType: creative.media
            .find((item) => item.status === "accepted")
            .mimeType.split("/")?.[0],
          accountName: "21jjj87",
          // accountId: "17841447868680048",
          accountId: instagramUserId,
        },
      },
    });
    message.success("Form Submitted");
    setIsIgFormDescriptionVisible(true);
    setIsIgScheduleExistForCreative(true);
    setFormSubitted(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(creative);
    console.log("Failed:", errorInfo);
    message.error("Form errored");
  };

  return (
    <>
      {!formSubmitted && (
        <Form
          form={form}
          layout="vertical"
          className="flex flex-column"
          name="youtube"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={handleAccountChange}
        >
          <Form.Item
            name="account"
            label="Account"
            // getValueFromEvent={handleAccountChange}
            rules={[
              {
                required: true,
                message: "Please enter your account",
              },
            ]}
          >
            <Select>
              {fbPagesData &&
                fbPagesData?.map((o, idx) => (
                  <Option key={idx} value={o.id}>
                    {o.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Caption"
            name="caption"
            rules={[
              {
                required: true,
                message: "Please enter the caption",
              },
            ]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Row>
            <Form.Item
              label="Schedule Time"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please enter schedule",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Schedule Time"
              name="time"
              rules={[
                {
                  required: true,
                  message: "Please enter schedule",
                },
              ]}
            >
              <TimePicker
                className="ml-4"
                minuteStep={5}
                use12Hours
                format="HH:mm"
              />
            </Form.Item>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
export default InstagramUploadForm;
