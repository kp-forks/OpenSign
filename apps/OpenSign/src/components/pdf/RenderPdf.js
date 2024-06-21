import React from "react";
import RSC from "react-scrollbars-custom";
import { Document, Page } from "react-pdf";
import {
  defaultWidthHeight,
  handleImageResize,
  handleSignYourselfImageResize
} from "../../constant/Utils";
import Placeholder from "./Placeholder";
import Alert from "../../primitives/Alert";

function RenderPdf({
  pageNumber,
  drop,
  signerPos,
  successEmail,
  handleTabDrag,
  handleStop,
  isDragging,
  setIsSignPad,
  setIsStamp,
  handleDeleteSign,
  setSignKey,
  pdfDetails,
  xyPostion,
  pdfUrl,
  pageDetails,
  pdfRequest,
  signerObjectId,
  signedSigners,
  pdfLoad,
  setPdfLoad,
  placeholder,
  setSignerPos,
  setXyPostion,
  index,
  containerWH,
  setIsResize,
  handleLinkUser,
  setUniqueId,
  signersdata,
  setIsPageCopy,
  setSignerObjId,
  setShowDropdown,
  setIsInitial,
  setIsValidate,
  setWidgetType,
  setValidateAlert,
  setIsRadio,
  setCurrWidgetsDetails,
  setSelectWidgetId,
  selectWidgetId,
  unSignedWidgetId,
  setIsCheckbox,
  handleNameModal,
  handleTextSettingModal,
  setTempSignerId,
  uniqueId,
  pdfOriginalWH,
  scale
}) {
  const isMobile = window.innerWidth < 767;
  //check isGuestSigner is present in local if yes than handle login flow header in mobile view
  const isGuestSigner = localStorage.getItem("isGuestSigner");

  // handle signature block width and height according to screen
  const posWidth = (pos, signYourself) => {
    const getPdfPageWidth = pdfOriginalWH.find(
      (data) => data.pageNumber === pageNumber
    );
    const containerScale = containerWH.width / getPdfPageWidth.width || 1;
    const defaultWidth = defaultWidthHeight(pos.type).width;
    const posWidth = pos.Width ? pos.Width : defaultWidth;
    if (signYourself) {
      return posWidth * scale * containerScale;
    } else {
      if (pos.isMobile && pos.scale) {
        if (pos.IsResize) {
          if (scale > 1) {
            return posWidth * pos.scale * containerScale * scale;
          } else {
            return posWidth * containerScale;
          }
        } else {
          if (scale > 1) {
            return posWidth * pos.scale * containerScale * scale;
          } else {
            return posWidth * pos.scale * containerScale;
          }
        }
      } else {
        return posWidth * scale * containerScale;
      }
    }
  };
  const posHeight = (pos, signYourself) => {
    const getPdfPageWidth = pdfOriginalWH.find(
      (data) => data.pageNumber === pageNumber
    );
    const containerScale = containerWH.width / getPdfPageWidth?.width || 1;

    const posHeight = pos.Height || defaultWidthHeight(pos.type).height;
    if (signYourself) {
      return posHeight * scale * containerScale;
    } else {
      if (pos.isMobile && pos.scale) {
        if (pos.IsResize) {
          if (scale > 1) {
            return posHeight * pos.scale * containerScale * scale;
          } else {
            return posHeight * containerScale;
          }
        } else {
          if (scale > 1) {
            return posHeight * pos.scale * containerScale * scale;
          } else {
            return posHeight * pos.scale * containerScale;
          }
        }
      } else {
        return posHeight * scale * containerScale;
      }
    }
  };

  //function for render placeholder block over pdf document
  const checkSignedSigners = (data) => {
    let checkSign = [];
    //condition to handle quick send flow and using normal request sign flow
    checkSign = signedSigners
      ? signedSigners?.filter(
          (sign) =>
            sign?.Id === data?.Id || sign?.objectId === data?.signerObjId
        )
      : [];
    const handleAllUserName = (Id, Role, type) => {
      return (
        <React.Fragment>
          <div className="text-black text-[8px] font-bold">
            {
              pdfDetails[0].Signers?.find(
                (signer) => signer.objectId === data.signerObjId
              )?.Name
            }
          </div>
          {type && <div className="text-[11px] font-bold">{type}</div>}
          {Role && (
            <div className="text-black text-[8px] font-medium">
              {`(${Role})`}
            </div>
          )}
        </React.Fragment>
      );
    };
    return (
      checkSign.length === 0 &&
      data.placeHolder.map((placeData, key) => {
        return (
          <React.Fragment key={key}>
            {placeData.pageNumber === pageNumber &&
              placeData.pos.map((pos) => {
                return (
                  pos && (
                    <React.Fragment key={pos.key}>
                      <Placeholder
                        pos={pos}
                        setSignKey={setSignKey}
                        setIsSignPad={setIsSignPad}
                        setIsStamp={setIsStamp}
                        handleSignYourselfImageResize={handleImageResize}
                        index={pageNumber}
                        xyPostion={signerPos}
                        setXyPostion={setSignerPos}
                        data={data}
                        setIsResize={setIsResize}
                        isShowBorder={false}
                        signerObjId={signerObjectId}
                        isShowDropdown={true}
                        isNeedSign={true}
                        isSignYourself={false}
                        posWidth={posWidth}
                        posHeight={posHeight}
                        handleUserName={handleAllUserName}
                        isDragging={false}
                        pdfDetails={pdfDetails}
                        setIsInitial={setIsInitial}
                        setValidateAlert={setValidateAlert}
                        unSignedWidgetId={unSignedWidgetId}
                        setSelectWidgetId={setSelectWidgetId}
                        selectWidgetId={selectWidgetId}
                        setCurrWidgetsDetails={setCurrWidgetsDetails}
                        uniqueId={uniqueId}
                        scale={scale}
                        containerWH={containerWH}
                        pdfOriginalWH={pdfOriginalWH}
                        pageNumber={pageNumber}
                      />
                    </React.Fragment>
                  )
                );
              })}
          </React.Fragment>
        );
      })
    );
  };
  //function for render placeholder block over pdf document

  const handleUserName = (Id, Role, type) => {
    if (Id) {
      const checkSign = signersdata.find((sign) => sign.Id === Id);
      if (checkSign?.Name) {
        return (
          <>
            <div className="text-black text-[8px] font-medium">
              {checkSign?.Name}
            </div>
            {type && <div className="text-[11px] font-bold">{type}</div>}
            {Role && (
              <div className="text-black text-[8px] font-medium">
                {`(${Role})`}
              </div>
            )}
          </>
        );
      } else {
        return (
          <>
            {type && <div className="text-[11px] font-bold">{type}</div>}
            <div className="text-black text-[8px] font-medium">{Role}</div>
          </>
        );
      }
    } else {
      return (
        <>
          {type && <div className="text-[11px] font-bold">{type}</div>}
          <div className="text-black text-[8px] font-medium">{Role}</div>
        </>
      );
    }
  };
  return (
    <>
      {successEmail && <Alert type={"success"}>Email sent successfully!</Alert>}
      {isMobile ? (
        <div
          data-tut="reactourForth"
          style={{
            border: "0.1px solid #ebe8e8",
            marginTop: isGuestSigner && "30px"
          }}
          ref={drop}
          id="container"
        >
          {containerWH?.width &&
            pdfOriginalWH.length > 0 &&
            (pdfRequest
              ? signerPos.map((data, key) => {
                  return (
                    <React.Fragment key={key}>
                      {checkSignedSigners(data)}
                    </React.Fragment>
                  );
                })
              : placeholder // placeholder mobile
                ? signerPos.map((data, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        {data.placeHolder.map((placeData, index) => {
                          return (
                            <React.Fragment key={index}>
                              {placeData.pageNumber === pageNumber &&
                                placeData.pos.map((pos) => {
                                  return (
                                    <React.Fragment key={pos.key}>
                                      <Placeholder
                                        pos={pos}
                                        setIsPageCopy={setIsPageCopy}
                                        setSignKey={setSignKey}
                                        handleDeleteSign={handleDeleteSign}
                                        setIsStamp={setIsStamp}
                                        handleTabDrag={handleTabDrag}
                                        handleStop={handleStop}
                                        handleSignYourselfImageResize={
                                          handleImageResize
                                        }
                                        index={pageNumber}
                                        xyPostion={signerPos}
                                        setXyPostion={setSignerPos}
                                        setSignerObjId={setSignerObjId}
                                        data={data}
                                        setIsResize={setIsResize}
                                        setShowDropdown={setShowDropdown}
                                        isShowBorder={true}
                                        isPlaceholder={true}
                                        setUniqueId={setUniqueId}
                                        handleLinkUser={handleLinkUser}
                                        handleUserName={handleUserName}
                                        isSignYourself={false}
                                        posWidth={posWidth}
                                        posHeight={posHeight}
                                        isDragging={isDragging}
                                        setIsValidate={setIsValidate}
                                        setWidgetType={setWidgetType}
                                        setIsRadio={setIsRadio}
                                        setIsCheckbox={setIsCheckbox}
                                        setCurrWidgetsDetails={
                                          setCurrWidgetsDetails
                                        }
                                        setSelectWidgetId={setSelectWidgetId}
                                        selectWidgetId={selectWidgetId}
                                        handleNameModal={handleNameModal}
                                        setTempSignerId={setTempSignerId}
                                        uniqueId={uniqueId}
                                        handleTextSettingModal={
                                          handleTextSettingModal
                                        }
                                        scale={scale}
                                        containerWH={containerWH}
                                        pdfOriginalWH={pdfOriginalWH}
                                        pageNumber={pageNumber}
                                      />
                                    </React.Fragment>
                                  );
                                })}
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    );
                  })
                : xyPostion.map((data, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        {data.pageNumber === pageNumber &&
                          data.pos.map((pos) => {
                            return (
                              pos && (
                                <Placeholder
                                  pos={pos}
                                  setIsPageCopy={setIsPageCopy}
                                  setSignKey={setSignKey}
                                  handleDeleteSign={handleDeleteSign}
                                  setIsStamp={setIsStamp}
                                  handleTabDrag={handleTabDrag}
                                  handleStop={handleStop}
                                  handleSignYourselfImageResize={
                                    handleSignYourselfImageResize
                                  }
                                  index={index}
                                  xyPostion={xyPostion}
                                  setXyPostion={setXyPostion}
                                  containerWH={containerWH}
                                  setIsSignPad={setIsSignPad}
                                  isShowBorder={true}
                                  isSignYourself={true}
                                  posWidth={posWidth}
                                  posHeight={posHeight}
                                  pdfDetails={pdfDetails[0]}
                                  isDragging={isDragging}
                                  setIsInitial={setIsInitial}
                                  setWidgetType={setWidgetType}
                                  setSelectWidgetId={setSelectWidgetId}
                                  selectWidgetId={selectWidgetId}
                                  handleUserName={handleUserName}
                                  setIsCheckbox={setIsCheckbox}
                                  setValidateAlert={setValidateAlert}
                                  setCurrWidgetsDetails={setCurrWidgetsDetails}
                                  handleTextSettingModal={
                                    handleTextSettingModal
                                  }
                                  scale={scale}
                                  pdfOriginalWH={pdfOriginalWH}
                                  pageNumber={pageNumber}
                                />
                              )
                            );
                          })}
                      </React.Fragment>
                    );
                  }))}

          {/* this component for render pdf document is in middle of the component */}
          <div className="flex items-center justify-center">
            <Document
              onLoadError={() => {
                setPdfLoad(false);
              }}
              loading={"Loading Document.."}
              onLoadSuccess={pageDetails}
              // ref={pdfRef}'
              onClick={() => {
                if (setSelectWidgetId) {
                  setSelectWidgetId("");
                }
              }}
              file={
                pdfUrl
                  ? pdfUrl
                  : pdfDetails[0] && pdfDetails[0].SignedUrl
                    ? pdfDetails[0].SignedUrl
                    : pdfDetails[0].URL
              }
            >
              <Page
                key={index}
                pageNumber={pageNumber}
                width={containerWH.width}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                onGetAnnotationsError={(error) => {
                  console.log("annotation error", error);
                }}
              />
            </Document>
          </div>
        </div>
      ) : (
        <RSC
          style={{
            position: "relative",
            boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
            height: window.innerHeight + "px",
            zIndex: 0
          }}
          noScrollY={false}
          noScrollX={scale === 1 ? true : false}
        >
          <div
            style={{
              width: containerWH.width * scale
            }}
            ref={drop}
            id="container"
          >
            {pdfLoad &&
              containerWH?.width &&
              pdfOriginalWH.length > 0 &&
              (pdfRequest //pdf request sign flow
                ? signerPos?.map((data, key) => {
                    return (
                      <React.Fragment key={key}>
                        {checkSignedSigners(data)}
                      </React.Fragment>
                    );
                  })
                : placeholder //placeholder and template flow
                  ? signerPos.map((data, ind) => {
                      return (
                        <React.Fragment key={ind}>
                          {data.placeHolder.map((placeData, index) => {
                            return (
                              <React.Fragment key={index}>
                                {placeData.pageNumber === pageNumber &&
                                  placeData.pos.map((pos) => {
                                    return (
                                      <React.Fragment key={pos.key}>
                                        <Placeholder
                                          pos={pos}
                                          setIsPageCopy={setIsPageCopy}
                                          setSignKey={setSignKey}
                                          handleDeleteSign={handleDeleteSign}
                                          setIsStamp={setIsStamp}
                                          handleTabDrag={handleTabDrag}
                                          handleStop={handleStop}
                                          handleSignYourselfImageResize={
                                            handleImageResize
                                          }
                                          index={pageNumber}
                                          xyPostion={signerPos}
                                          setXyPostion={setSignerPos}
                                          setSignerObjId={setSignerObjId}
                                          data={data}
                                          setIsResize={setIsResize}
                                          setShowDropdown={setShowDropdown}
                                          isShowBorder={true}
                                          isPlaceholder={true}
                                          setUniqueId={setUniqueId}
                                          handleLinkUser={handleLinkUser}
                                          handleUserName={handleUserName}
                                          isSignYourself={false}
                                          posWidth={posWidth}
                                          posHeight={posHeight}
                                          isDragging={isDragging}
                                          setIsValidate={setIsValidate}
                                          setWidgetType={setWidgetType}
                                          setIsRadio={setIsRadio}
                                          setIsCheckbox={setIsCheckbox}
                                          setCurrWidgetsDetails={
                                            setCurrWidgetsDetails
                                          }
                                          setSelectWidgetId={setSelectWidgetId}
                                          selectWidgetId={selectWidgetId}
                                          handleNameModal={handleNameModal}
                                          setTempSignerId={setTempSignerId}
                                          uniqueId={uniqueId}
                                          handleTextSettingModal={
                                            handleTextSettingModal
                                          }
                                          scale={scale}
                                          containerWH={containerWH}
                                          pdfOriginalWH={pdfOriginalWH}
                                          pageNumber={pageNumber}
                                        />
                                      </React.Fragment>
                                    );
                                  })}
                              </React.Fragment>
                            );
                          })}
                        </React.Fragment>
                      );
                    })
                  : xyPostion.map((data, ind) => {
                      // signyourself flow
                      return (
                        <React.Fragment key={ind}>
                          {data.pageNumber === pageNumber &&
                            data.pos.map((pos) => {
                              return (
                                <React.Fragment key={pos.key}>
                                  <Placeholder
                                    pos={pos}
                                    setIsPageCopy={setIsPageCopy}
                                    setSignKey={setSignKey}
                                    handleDeleteSign={handleDeleteSign}
                                    setIsStamp={setIsStamp}
                                    handleTabDrag={handleTabDrag}
                                    handleStop={(event, dragElement) =>
                                      handleStop(event, dragElement, pos.type)
                                    }
                                    handleSignYourselfImageResize={
                                      handleSignYourselfImageResize
                                    }
                                    index={index}
                                    xyPostion={xyPostion}
                                    setXyPostion={setXyPostion}
                                    setIsSignPad={setIsSignPad}
                                    isShowBorder={true}
                                    isSignYourself={true}
                                    posWidth={posWidth}
                                    posHeight={posHeight}
                                    pdfDetails={pdfDetails[0]}
                                    isDragging={isDragging}
                                    setIsInitial={setIsInitial}
                                    setWidgetType={setWidgetType}
                                    setSelectWidgetId={setSelectWidgetId}
                                    selectWidgetId={selectWidgetId}
                                    handleUserName={handleUserName}
                                    setIsCheckbox={setIsCheckbox}
                                    setValidateAlert={setValidateAlert}
                                    setCurrWidgetsDetails={
                                      setCurrWidgetsDetails
                                    }
                                    handleTextSettingModal={
                                      handleTextSettingModal
                                    }
                                    scale={scale}
                                    containerWH={containerWH}
                                    pdfOriginalWH={pdfOriginalWH}
                                    pageNumber={pageNumber}
                                  />
                                </React.Fragment>
                              );
                            })}
                        </React.Fragment>
                      );
                    }))}

            {/* this component for render pdf document is in middle of the component */}
            <Document
              onLoadError={() => {
                pdfLoad(false);
              }}
              loading={"Loading Document.."}
              onLoadSuccess={pageDetails}
              onClick={() => {
                if (setSelectWidgetId) {
                  setSelectWidgetId("");
                }
              }}
              // ref={pdfRef}
              file={
                pdfUrl
                  ? pdfUrl
                  : pdfDetails[0] && pdfDetails[0].SignedUrl
                    ? pdfDetails[0].SignedUrl
                    : pdfDetails[0].URL
              }
            >
              <Page
                key={index}
                width={containerWH.width}
                scale={scale || 1}
                className={"-z-[1]"} // when user zoom-in in tablet widgets move backward that's why pass -z-[1]
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                onGetAnnotationsError={(error) => {
                  console.log("annotation error", error);
                }}
              />
            </Document>
          </div>
        </RSC>
      )}
    </>
  );
}

export default RenderPdf;
