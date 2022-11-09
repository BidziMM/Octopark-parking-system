import React from 'react';
import slaveParkingSessionArrowIco from '../../../Assets/slave_parking_session_arrow_ico.png';

export default function ActiveSession({ data }) {
  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
      }}
      className="text-center"
    >
      <p style={{ fontSize: 12 }}>aktywna sesja:</p>

      <p
        style={{
          fontSize: 21,
          fontWeight: 'bold',
          paddingLeft: 15,
          paddingRight: 15,
          textAlign: 'center',
        }}
      >
        {data.overridingSessionObject.parkingObject.name}
      </p>

      <p style={{ fontSize: 12, color: 'grey', marginTop: 0 }}>
        {data.overridingSessionObject.parkingObject.street +
          ' ' +
          data.overridingSessionObject.parkingObject.streetNumber +
          ', ' +
          data.overridingSessionObject.parkingObject.postalCode +
          ' ' +
          data.overridingSessionObject.parkingObject.city}
      </p>

      <p
        style={{
          fontSize: 10,
          color: 'grey',
          marginTop: 0,
          fontWeight: 'bold',
        }}
      >
        wjazd:
        {data.overridingSessionObject.createDate}
      </p>

      {data.overridingSessionObject.slaveSessionsArray.length > 0 &&
      data.overridingSessionObject.slaveSessionsArray[0].status == 'open' ? (
        <button
          className="text-left p-3"
          style={{
            display:"flex",
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#242424',
            borderRadius: 7,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingVertical: 10,
            marginTop: 10,
          }}
        >
          <img
            style={{
              resizeMode: 'contain',
              height: 30,
              marginBottom: 0,
              marginLeft: 3,
              width: 30,
              marginRight: 10,
            }}
            src={slaveParkingSessionArrowIco}
          />

          <div
            style={{
              flex: 5,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <h5
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              {data.overridingSessionObject.slaveSessionsArray[0].parkingObject.shortName}
            </h5>
            <h5
              style={{
                fontSize: 8,
                color: '#dedede',
                fontWeight: 'bold',
              }}
            >
              Parking podrzędny - wjazd: {data.overridingSessionObject.slaveSessionsArray[0].createDate}
            </h5>
            <h5
              style={{
                fontSize: 8,
                color: '#85c950',
                fontWeight: 'bold',
              }}
            >
              {data.overridingSessionObject.slaveSessionsArray[0].duration.d != 0 ? (
                <>{data.overridingSessionObject.slaveSessionsArray[0].duration.d} dni&nbsp;</>
              ) : null}
              {data.overridingSessionObject.slaveSessionsArray[0].duration.h} godz{' '}
              {data.overridingSessionObject.slaveSessionsArray[0].duration.i} min
            </h5>
          </div>
        </button>
      ) : null}
    </div>
  );
}