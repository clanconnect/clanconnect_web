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
  Alert,
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
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  const [mediaValidateAlert, setMediaValidateAlert] = useState(null);

  const validateImage = (image) => {
    const sizeInMb = image.size / 1024 / 1024;
    const format = image.mimeType.split("/")[1];
    // const sizeInMb = 8488608 / 1024 / 1024
    if (sizeInMb > 8) {
      return false;
    }
    if (!["png", "jpg", "jpeg"].includes(format)) {
      return false;
    }
    return true;
  };
  const validateVideo = (video) => {
    const sizeInMb = video.size / 1024 / 1024;
    const format = video.mimeType.split("/")[1];
    // const sizeInMb = 848860834543 / 1024 / 1024
    if (sizeInMb > 100) {
      return false;
    }
    if (!["mp4", "mov"].includes(format)) {
      return false;
    }
    return true;
  };
  const imageValidationAlert = (
    <Alert
      description="Please upload an image of format jpeg/png and size less than 8MB"
      type="warning"
      showIcon
      closable
    />
  );
  const videoValidationAlert = (
    <Alert
      description="Please upload a video of format mp4/mov and size less than 100MB"
      type="warning"
      showIcon
      closable
    />
  );
  useEffect(() => {
    const image = creative?.media.find(
      (o) => o.mimeType.includes("image") && o.status === "accepted"
    );
    const video = creative?.media.find(
      (o) => o.mimeType.includes("video") && o.status === "accepted"
    );
    console.log("video, image", video, image);
    if (image && !validateImage(image)) {
      console.log("image validated");
      setSubmitBtnDisabled(true);
      setMediaValidateAlert(imageValidationAlert);
    }
    if (video && !validateVideo(video)) {
      setSubmitBtnDisabled(true);
      setMediaValidateAlert(videoValidationAlert);
    }
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
    const date = moment(values.date).format("YYYY-MM-DD");
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
          accountName: fbPagesData.find(
            (o) => o.id === form.getFieldValue("account")
          ).name,
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
      {mediaValidateAlert}
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
              {
                validator: (_, value) => {
                  if (value.length >= 2200) {
                    return Promise.reject(
                      new Error("Character Limit of 2200 character exceeded")
                    );
                  }
                  if (
                    value.split(" ").filter((elem) => elem.includes("#"))
                      .length > 30
                  ) {
                    return Promise.reject(
                      new Error("Limit of 30 hashtags exceeded")
                    );
                  }
                  if (
                    value.split(" ").filter((elem) => elem.includes("@"))
                      .length > 20
                  ) {
                    return Promise.reject(
                      new Error("Limit of 20 usertags exceeded")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Row>
            <Form.Item
              label="Schedule Date"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please enter schedule",
                },
              ]}
            >
              <DatePicker format={"DD/MM/YYYY"} />
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
            <Button
              type="primary"
              htmlType="submit"
              disabled={submitBtnDisabled}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
export default InstagramUploadForm;
