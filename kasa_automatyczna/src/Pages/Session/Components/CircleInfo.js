import React from "react";

import PaymentBlock from "./PaymentBlock";

import blackGradientBg from '../../../Assets/black_gradient_bg.png';

export default function CircleInfo({data}) {
  return (
    <div>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: 360,
          height: 360,
          backgroundImage:`url(${blackGradientBg})`,
          borderRadius: 99999
        }}
        className="relative text-center"
      >
        {data.overridingSessionObject.isActive == true ? (
          <div
            className="flex items-center justify-center flex-col h-full w-full"
            //Jest to wysokosc Payment Bloku
            style={{paddingBottom:100}}
          >
            {data.overridingSessionObject.buforAfterPaymentIsRunning ? (
              <>
                <h5
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "normal",
                    marginTop: 50,
                  }}
                >
                  wyjedź w ciągu:
                </h5>
                <h5
                  style={{
                    color: "#fff",
                    fontSize: 52,
                    fontWeight: "bold",
                    marginTop: -10,
                  }}
                >
                  00:
                  {
                    data.overridingSessionObject
                      .buforAfterPayment_minutesLeft
                  }
                </h5>
              </>
            ) : (
              <div>
                <h5
                  style={{
                    color: "#fff",
                    fontSize: 21,
                    fontWeight: "normal",
                    marginTop: 50,
                  }}
                >
                  {
                    data.overridingSessionObject.currentDurationObject
                      .days
                  }{" "}
                  dni
                </h5>
                <h5
                  style={{
                    color: "#fff",
                    fontSize: 52,
                    fontWeight: "bold",
                    marginTop: -10,
                  }}
                >
                  {data.overridingSessionObject.currentDurationObject.h}:
                  {data.overridingSessionObject.currentDurationObject.i}
                </h5>
                <div className="flex row  justify-around" style={{marginTop:-10}}>
                  <h5
                    style={{
                      color: "#fff",
                      fontSize: 19,
                      fontWeight: "normal",
                    }}
                  >
                    g
                  </h5>
                  <h5
                    style={{
                      color: "#fff",
                      fontSize: 19,
                      fontWeight: "normal",
                    }}
                  >
                    m
                  </h5>
                </div>
              </div>
            )}
          </div>
        ) : (
          <h5 style={{ fontSize: 24, color: "white", textAlign: "center" }}>
            Brak aktywnej
            {"\n"}
            sesji parkowania
          </h5>
        )}
      </div>

      <PaymentBlock
        data={data}
      />
    </div>
  );
}
