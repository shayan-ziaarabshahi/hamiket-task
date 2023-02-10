import { RangePicker } from "jalaali-react-date-picker";
import styles from "./Table.module.css";
import "jalaali-react-date-picker/lib/styles/index.css";
import { useEffect, useState } from "react";
import CustomSelect from "./../components/CustomSelect";
import { headerSelectList, headerDropdownList } from "./../data/selectData";
import TableRow from "./TableRow";
import data from "./../data/index.json";
import PN from "persian-number";
import moment from "moment-jalaali";

function Table() {
  const [searchText, setSearchText] = useState();
  const [showRangePicker, setShowRangePicker] = useState(false);
  const [headerSelectValue, setHeaderSelectValue] = useState();
  const [headerDropdownValue, setHeaderDropdownValue] = useState();
  const [currentSentStatus, setCurrentSentStatus] = useState("1");
  const [currentList, setCurrentList] = useState([]);
  const [dateRange, setDateRange] = useState([{}, {}]);

  const handleSearchBoxChange = (e) => {
    setSearchText(e.target.value)
    if (e.target.value) {
      const filteredItems = currentList.filter((item) => {
        return item.productDetail.productName.includes(e.target.value);
      });
      setDateRange([{}, {}]);
      setCurrentList(filteredItems);
    } else {
      setDateRange([{}, {}]);
      setCurrentList(
        data.filter((item) => item.sentStatus === String(currentSentStatus))
      );
    }
  };

  const handleDateRangeChange = (dateRange) => {
    setSearchText('')
    setDateRange(dateRange);
    setCurrentList(
      currentList.filter(
        (item) =>
          item.create_time > dateRange[0]._d.getTime() &&
          item.create_time < dateRange[1]._d.getTime()
      )
    );
    setShowRangePicker(false);
  };

  useEffect(() => {
    setSearchText('')
    setDateRange([{}, {}]);
    setCurrentList(
      data.filter((item) => item.sentStatus === String(currentSentStatus))
    );
  }, [currentSentStatus]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderRight}>
              <div className={styles.searchBoxContainer}>
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSearchBoxChange}
                  className={styles.searchInput}
                />
                <div className={styles.searchIcon}>
                  <i className="bi bi-search"></i>
                </div>
              </div>
              <div className={styles.tableHeaderRightBottom}>
                <div className={styles.rangePickerContainer}>
                  <div
                    onClick={() => setShowRangePicker(!showRangePicker)}
                    className={styles.rangePickerField}
                  >
                    {dateRange[0]._d && (
                      <div className={styles.dateRangeShowContainer}>
                        {PN.convertEnToPe(
                          moment(dateRange[0]._d).format("jYYYY/jM/jD")
                        )}{" "}
                        -
                        {PN.convertEnToPe(
                          moment(dateRange[1]._d).format("jYYYY/jM/jD")
                        )}
                      </div>
                    )}
                    <div className={styles.calenderIcon}>
                      <i className="bi bi-calendar"></i>
                    </div>
                  </div>
                  <div className={styles.rangePickerWrapper}>
                    {showRangePicker && (
                      <RangePicker
                        onChange={(data) => handleDateRangeChange(data)}
                      />
                    )}
                  </div>
                </div>
                <CustomSelect
                  listItems={headerSelectList}
                  currentValue={headerSelectValue}
                  setCurrentValue={setHeaderSelectValue}
                />
              </div>
            </div>
            <div className={styles.tableHeaderLeft}>
              <div className={styles.tableHeaderLeftShowPerPageContainer}>
                <span className={styles.tableHeaderLeftShowPerPageTitle}>
                  تعداد نمایش در هر صفحه
                </span>
                <div className={styles.dropdownWrapper}>
                  <CustomSelect
                    listItems={headerDropdownList}
                    currentValue={headerDropdownValue}
                    setCurrentValue={setHeaderDropdownValue}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <td>کالا</td>
                <td>خریدار</td>
                <td>تعداد</td>
                <td>قیمت</td>
                <td>هزینه ارسال</td>
                <td>وضعیت</td>
                <td>تاریخ</td>
              </thead>
              <tbody>
                {currentList.map((i) => (
                  <TableRow item={i} />
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.tableFooter}>
            <div className={styles.tableFooterRight}>
              <div className={styles.footerArrowIcon}>
                <i className="bi bi-arrow-right-short"></i>
              </div>
              <div
                onClick={() => setCurrentSentStatus("1")}
                className={`${styles.footerControl} ${
                  currentSentStatus === "1" && styles.yellowBG
                }`}
              >
                ۱
              </div>
              <div
                onClick={() => setCurrentSentStatus("2")}
                className={`${styles.footerControl}  ${
                  currentSentStatus === "2" && styles.greenBG
                }`}
              >
                ۲
              </div>
              <div
                onClick={() => setCurrentSentStatus("3")}
                className={`${styles.footerControl} ${
                  currentSentStatus === "3" && styles.redBG
                }`}
              >
                ۳
              </div>
              <div className={styles.footerArrowIcon}>
                <i class="bi bi-arrow-left-short"></i>
              </div>
            </div>
            <div className={styles.tableFooterLeft}>
              <span>{`تعداد نتایج: ${PN.convertEnToPe(
                currentList.length
              )} مورد`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
