import React from "react";
import Modal from "../../../Components/Modal";

export default function ParkinCostModal({ data, closeModal, isOpen }) {
  return (
    <Modal isOpen={isOpen} onClose={() => closeModal()}>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
        }}
      >
        <div
          style={{
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            width: "90%",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            }
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              textAlign:'center'
            }}
          >
            Koszt parkowania
          </p>

          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.overridingSessionObject.isActive ? (
              <div>
                <p>Łączny czas parkowania:</p>

                <p style={{ fontWeight: "bold", textAlign: "center" }}>
                  {
                    data.overridingSessionObject.priceCalculationMetodology
                      .globalOverridingSessionDuration.days
                  }{" "}
                  dni&nbsp;&nbsp;&nbsp;&nbsp;
                  {
                    data.overridingSessionObject.priceCalculationMetodology
                      .globalOverridingSessionDuration.h
                  }{" "}
                  h&nbsp;&nbsp;&nbsp;&nbsp;
                  {
                    data.overridingSessionObject.priceCalculationMetodology
                      .globalOverridingSessionDuration.i
                  }{" "}
                  min
                </p>

                {data.overridingSessionObject.priceCalculationMetodology
                  .slaveSessions.length > 0 ? (
                  <>
                    <p style={{ marginTop: 15 }}>
                      W tym sesje na parkingach podrzędnych:
                    </p>
                    <div
                      style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: "#d9d9d9",
                        marginBottom: 7,
                        marginTop: 7,
                      }}
                    />
                  </>
                ) : null}

                {data.overridingSessionObject.priceCalculationMetodology.slaveSessions.map(
                  (item) => (
                    <>
                      <p style={{ fontWeight: "bold", fontSize: 12 }}>
                        {item.parkingObject.shortName}
                      </p>

                      <p style={{ fontSize: 7, color: "#d7d7d7" }}>
                        Od: {item.createDate}
                        {item.closedDate != item.createDate ? (
                          <>
                            Do:
                            {item.closedDate}
                          </>
                        ) : null}
                      </p>

                      <p style={{ fontSize: 11 }}>
                        Czas parkowania: &nbsp;&nbsp;
                        {item.globalSlaveSessionDuration.days} dni&nbsp;&nbsp;
                        {item.globalSlaveSessionDuration.h} h&nbsp;&nbsp;
                        {item.globalSlaveSessionDuration.i} min
                      </p>
                      {item.appliedReservationsArray.length > 0 ? (
                        <>
                          <p style={{ fontSize: 11, fontWeight: "bold" }}>
                            Uwzględniono rezerwacje:
                          </p>
                          {item.appliedReservationsArray.map(
                            (reservationItem) => (
                              <div
                                style={{
                                  width: "100%",
                                  backgroundColor: "#e3e3e3",
                                  borderRadius: 1,
                                  marginTop: 5,
                                  marginBottom: 5,
                                  paddingTop: 3,
                                  paddingBottom: 3,
                                }}
                              >
                                <p style={{ fontSize: 6, color: "#000" }}>
                                  Rezerwacja z dnia:{" "}
                                  {reservationItem.createDate}
                                </p>

                                <p
                                  style={{
                                    fontSize: 9,
                                    fontWeight: "bold",
                                  }}
                                >
                                  Od: {reservationItem.fromDate} do:{" "}
                                  {reservationItem.toDate}
                                </p>
                              </div>
                            )
                          )}
                        </>
                      ) : null}

                      {item.rabateCodeAppliedForThisSlaveSession ? (
                        <p style={{ fontSize: 11 }}>
                          Uwzględniono rabat:
                          {(() => {
                            switch (item.assignedRabateObject.rabateType) {
                              case "percent":
                                return "-";
                                break;
                              case "const":
                                return "-";
                                break;
                              case "freeHours":
                                return "";
                                break;
                            }
                          })()}
                          &nbsp;
                          {item.assignedRabateObject.rabateValue / 100}
                          {(() => {
                            switch (item.assignedRabateObject.rabateType) {
                              case "percent":
                                return " %";
                                break;
                              case "const":
                                return " PLN";
                                break;
                              case "freeHours":
                                return " darmowych godzin";
                                break;
                            }
                          })()}
                          &nbsp;
                          <p style={{ color: "grey", fontSize: 7 }}>
                            (kampania: {item.assignedRabateObject.campaignName})
                          </p>
                        </p>
                      ) : null}

                      <p style={{ fontSize: 11 }}>
                        Czas do rozliczenia: &nbsp;&nbsp;
                        {item.slaveSessionDurationForCostCalculation.days}{" "}
                        dni&nbsp;&nbsp;
                        {item.slaveSessionDurationForCostCalculation.h}{" "}
                        h&nbsp;&nbsp;
                        {item.slaveSessionDurationForCostCalculation.i} min
                      </p>

                      <p style={{ fontSize: 11 }}>
                        Koszt sesji: &nbsp;&nbsp;
                        {item.totalSlaveSessionCost / 100} PLN
                      </p>

                      <div
                        style={{
                          width: "100%",
                          height: 1,
                          backgroundColor: "#e3e3e3",
                          marginTop: 7,
                          marginBottom: 7,
                        }}
                      />
                    </>
                  )
                )}

                {data.overridingSessionObject.priceCalculationMetodology
                  .overridingSessionReservations.length > 0 ? (
                  <>
                    <p>Uwzględniono rezerwacje:</p>
                    <p style={{ fontSize: 9, color: "#cfcfcf" }}>
                      na parkingu nadrzędnym
                    </p>

                    {data.overridingSessionObject.priceCalculationMetodology.overridingSessionReservations.map(
                      (reservationItem) => (
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#e3e3e3",
                            borderRadius: 1,
                            marginTop: 5,
                            marginBottom: 5,
                            paddingTop: 3,
                            paddingBottom: 3,
                          }}
                        >
                          <p style={{ fontSize: 6, color: "#000" }}>
                            Rezerwacja z dnia: {reservationItem.createDate}
                          </p>

                          <p style={{ fontSize: 9, fontWeight: "bold" }}>
                            Od: {reservationItem.fromDate} do:{" "}
                            {reservationItem.toDate}
                          </p>
                        </div>
                      )
                    )}
                  </>
                ) : null}

                {data.overridingSessionObject.priceCalculationMetodology
                  .rabateCodeAppliedForThisOverridingSession ? (
                  <>
                    <p style={{ fontSize: 11 }}>
                      Uwzględniono rabat:
                      {(() => {
                        switch (
                          data.overridingSessionObject
                            .priceCalculationMetodology
                            .overridingSessionAssignedRabateObject.rabateType
                        ) {
                          case "percent":
                            return "-";
                            break;
                          case "const":
                            return "-";
                            break;
                          case "freeHours":
                            return "";
                            break;
                        }
                      })()}
                      &nbsp;
                      {data.overridingSessionObject.priceCalculationMetodology
                        .overridingSessionAssignedRabateObject.rabateValue /
                        100}
                      {(() => {
                        switch (
                          data.overridingSessionObject
                            .priceCalculationMetodology
                            .overridingSessionAssignedRabateObject.rabateType
                        ) {
                          case "percent":
                            return " %";
                            break;
                          case "const":
                            return " PLN";
                            break;
                          case "freeHours":
                            return " darmowych godzin";
                            break;
                        }
                      })()}
                      &nbsp;
                      <p style={{ color: "grey", fontSize: 7 }}>
                        (kampania:{" "}
                        {
                          data.overridingSessionObject
                            .priceCalculationMetodology
                            .overridingSessionAssignedRabateObject.campaignName
                        }
                        )
                      </p>
                    </p>

                    <p style={{ fontSize: 9, color: "#cfcfcf" }}>
                      na parkingu nadrzędnym
                    </p>
                  </>
                ) : null}

                <p>
                  Pozostaje czas do rozliczenia na parkingu nadrzędnym:
                </p>

                <p style={{ fontWeight: "bold", textAlign: "center" }}>
                  {
                    data.overridingSessionObject.priceCalculationMetodology
                      .overridingSessionTimeForCalculationLeft.days
                  }{" "}
                  dni&nbsp;&nbsp;
                  {
                    data.overridingSessionObject.priceCalculationMetodology
                      .overridingSessionTimeForCalculationLeft.h
                  }{" "}
                  h&nbsp;&nbsp;
                  {
                    data.overridingSessionObject.priceCalculationMetodology
                      .overridingSessionTimeForCalculationLeft.i
                  }{" "}
                  min
                </p>

                <p>Należność za sesję na parkingu nadrzędnym:</p>

                <p style={{ fontWeight: "bold", textAlign: "center" }}>
                  {data.overridingSessionObject.priceCalculationMetodology
                    .price100ForOverridingSessionOnly / 100}{" "}
                  PLN
                </p>

                <p>Należność łączna:</p>

                <p style={{ fontWeight: "bold", textAlign: "center" }}>
                  {data.overridingSessionObject.priceCalculationMetodology
                    .totalOverridingSessionAndSlavesSessionsCost / 100}{" "}
                  PLN
                </p>
              </div>
            ) : null}
          </div>

          <div style={{ height: 30 }} />
          <button onClick={closeModal} className='w-full bg-green-500 p-4 rounded-lg text-white text-lg font-bold'>Zamknij</button>
        </div>
      </div>
    </Modal>
  );
}
