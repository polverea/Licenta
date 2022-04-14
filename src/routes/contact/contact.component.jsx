import { useState } from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import "./contact.styles.scss";
import { db } from "../../firebase/firebase.utils";
import { setDoc, doc } from "firebase/firestore";

const ContactPage = () => {
  const defaultData = {
    name: "",
    email: "",
    message: "",
  };
  const [data, setData] = useState(defaultData);
  const { name, email, message } = data;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const time = new Date();
    try {
      await setDoc(doc(db, "contact", time.toString()), {
        name: name,
        email: email,
        message: message,
        time: time,
      }).then(() => alert("Message has been submited"));
      setData(defaultData);
    } catch (e) {
      console.log("error ", e);
    }
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="message">
          <h2>
            You are important for us and we would like to help you. Contact us!{" "}
          </h2>
        </div>
        <FormInput
          type="text"
          label="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />

        <FormInput
          type="email"
          label="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <FormInput
          type="text"
          label="Your message"
          name="message"
          value={message}
          onChange={handleChange}
          required
        />
        <CustomButton type="submit"> Send </CustomButton>
      </form>
    </div>
  );
};

export default ContactPage;
