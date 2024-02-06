import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
function Contacts({ data }) {
  return (
    (data.state ||
      data.country ||
      data.email ||
      data.phoneNumber ||
      data.city ||
      data.zipCode) && (
      <section className="section">
        <div>
          <style>
            {`
             .content {
                padding: 10px;
              }
              
              .content .sub_content .item {
                display: -webkit-flex; /* WebKit-based browsers */
                display: flex;
                -webkit-border-radius: 2px;
                border-radius: 2px;
                -webkit-align-items: center; /* WebKit-based browsers */
                align-items: center;
                margin-bottom: 15px;
              }
              
              
              .content .sub_content .icon {
                margin-right: 5px;
                display: -webkit-flex; /* WebKit-based browsers */
                display: flex;
                -webkit-justify-content: center; /* WebKit-based browsers */
                justify-content: center;
                -webkit-align-items: center; /* WebKit-based browsers */
                align-items: center;
              }

              .text {
                color: #fff;
              }              
            `}
          </style>
          <div className="content">
            <h2>Contact</h2>
            <div className="sub_content">
              <div className="item">
                <div className="icon">
                  <AiOutlineMail fill="#ffffff" />
                </div>
                <div className="text">{data?.email}</div>
              </div>

              <div className="item">
                <div className="icon">
                  <AiOutlinePhone fill="#ffffff" />
                </div>
                <div className="text">{data?.phoneNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
}

export default Contacts;
