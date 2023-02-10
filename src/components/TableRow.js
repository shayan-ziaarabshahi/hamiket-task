import React, { Fragment, useEffect, useState } from "react";
import styles from "./TableRow.module.css";
import imagePlaceholder from "./../images/imagePlaceholder.png";
import PN from "persian-number";
import { goodStatusesList } from "./../data/selectData";



export default function TableRow({ item }) {
  let sentStatus = goodStatusesList.filter(
    (i) => i.id === Number(item.sentStatus)
  )[0];

  const [showDetails, setShowDetails] = useState(false);
  const [newPrice, setNewPrice] = useState(item.price);
  const [newPriceError, setNewPriceError] = useState(false);
  const [newStock, setNewStock] = useState(item.quantity);
  

  const handleUpdateClick = () => {
    if (!newPrice) {
      setNewPriceError(true);
      return;
    } else {
      if (newPriceError) {
        setNewPriceError(false);
      }
    }
  };

  useEffect(() => {
    if (!showDetails) {
      if (newPrice !== item.price) {
        setNewPrice(item.price);
      }
      if (newPriceError) {
        setNewPriceError(false);
      }
    }
  }, [showDetails, newPriceError, item.price, newPrice]);

  return (
    <Fragment key={item.id}>
      <tr className={styles.firstRow}>
        <td className={styles.goodContainer}>
          <img
            src={item.productDetail.productPic || imagePlaceholder}
            alt={"good"}
          />
          <span>{PN.convertEnToPe(item.productDetail.productName)}</span>
        </td>
        <td>
          <span>{PN.convertEnToPe(item.userName)}</span>
        </td>
        <td>
          <span>{PN.convertEnToPe(item.quantity)}</span>
        </td>
        <td>
          <span>{PN.convertEnToPe(item.price)}</span>
          &nbsp;
          <span>تومان</span>
        </td>
        <td>
          <span>{PN.convertEnToPe(item.sendPrice)}</span>
          &nbsp;
          <span>تومان</span>
        </td>
        <td>
          <span
            onClick={() =>
              item.sentStatus === "1" ? setShowDetails(!showDetails) : ""
            }
            style={{
              backgroundColor: sentStatus.bg,
              color: sentStatus.color,
            }}
            className={styles.status}
          >
            {sentStatus.title}
          </span>
        </td>
        <td>
          <span>
            {new Intl.DateTimeFormat("fa-IR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(item.create_time)}
          </span>
        </td>
      </tr>
      {showDetails && (
        <tr className={styles.secondRow}>
          <td colSpan={7}>
            <div className={styles.detailsContainer}>
              <div className={styles.detailsRight}>
                <div className={styles.detailsRightGrid}>
                  <div className={styles.currentPriceFieldContainer}>
                    <span className={styles.currentPriceFieldLabel}>
                      قیمت فعلی
                    </span>
                    <div className={styles.currentPriceField}>
                      <div className={styles.currentPriceValue}>
                        <span>{PN.convertEnToPe(item.price)}</span>
                        &nbsp;
                        <span>تومان</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.newPriceFieldContainer}>
                    <label htmlFor="new_price_input">قیمت جدید</label>
                    <input
                      type='number'
                      id="new_price_input"
                      className={styles.newPriceInput}
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                    <span className={styles.newPriceInputSign}>تومان</span>
                    {newPriceError && (
                      <span className={styles.errorMessage}>
                        این فیلد اجباری است.
                      </span>
                    )}
                  </div>

                  <div className={styles.currentStockFieldContainer}>
                    <span className={styles.currentStockFieldLabel}>
                      موجودی فعلی
                    </span>
                    <div className={styles.currentStockField}>
                      <div className={styles.currentStockValue}>
                        <span>{PN.convertEnToPe(item.quantity)}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.newStockFieldContainer}>
                    <span className={styles.newStockFieldLabel}>
                      موجودی جدید
                    </span>
                    <div className={styles.newStockInputContainer}>
                      <button onClick={() => setNewStock((prev) => ++prev)}>
                        +
                      </button>
                      <div
                        id="new_stock_input"
                        className={styles.newStockInput}
                      >
                        {PN.convertEnToPe(newStock)}
                      </div>
                      <button
                        onClick={() =>
                          setNewStock((prev) => (prev > 0 ? --prev : prev))
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.detailsLeft}>
                <div className={styles.detailsLeftButtonsContainer}>
                  <button
                    onClick={() => setShowDetails(false)}
                    className={styles.detailsLeftCancelButton}
                  >
                    انصراف
                  </button>
                  <button
                    onClick={handleUpdateClick}
                    className={styles.detailsLeftUpdateButton}
                  >
                    به روزرسانی
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
      <tr className={styles.borderBottom}>
        <td colSpan={7}></td>
      </tr>
    </Fragment>
  );
}
