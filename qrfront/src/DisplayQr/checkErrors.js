
export default (json) => {
    // funkcja przyjmuje obiekt json jako argument i odpowiednio nazywa dany error jednocześnie emitując go (alert)
    if (
      json?.userTryGoOutFromSlaveParking_butDoesntHaveOverridingSessionAssignedToOverridingParkingOfThisSlaveParking ==
      true
    ) {
      return {
        title:'Błąd krytyczny !',
        msg: 'Próbujesz wyjechać z parkingu podrzędnego, który nie jest przypisany do parkingu nadrzędnego, na który chcesz wjechać. Prawdopodobnie operator nieprawidłowo skonfigurował parking porzędny w naszym systemie. Wyjaśnij problem z obsługą parkingu.',
      }
    }
    if (
      json?.userTryGoInToSlaveParking_butDoesntHaveOverridingSessionAssignedToOverridingParkingOfThisSlaveParking == true
    ) {
        return {
            title:'Błąd krytyczny !',
            msg: 'Próbujesz wjechać na parking podrzędny, który nie jest przypisany do parkingu nadrzędnego, na którym się znajdujesz. Prawdopodobnie operator nieprawidłowo skonfigurował parking porzędny w naszym systemie. Wyjaśnij problem z obsługą parkingu.',
          }
    }
    if (json?.userTryGoInToSlaveParking_butDoesntHaveAnyOverridingSessionOpened == true) {
        return {
            title:'Błąd krytyczny !',
            msg: 'Próbujesz wjechać na parking podrzędny, lecz wjazdu na parking nadrzędny dokonano bez użycia naszej aplikacji, dlatego też nie możliwe jest rozpoczęcie sesji w naszym systemie. Wjedź korzystając z tego samego systemu, dzięki któremu dokonano wjazdu na parking nadrzędny (np. konwencjonalny bilet).',
          }
    }
    if (json?.userTryGoOutFromSlaveParking_butDoesntHaveAnyOverridingSessionOpened == true) {
        return {
            title:'Błąd krytyczny !',
            msg: 'Próbujesz wyjechać z parkingu podrzędnego, lecz wjazdu na parking nadrzędny dokonano bez użycia naszej aplikacji, dlatego też nie możliwe jest rozpoczęcie sesji w naszym systemie. Wyjedź korzystając z tego samego systemu, dzięki któremu dokonano wjazdu (np. konwencjonalny bilet).',
        }
    }

    if (json?.userAlreadyHaveOpenOverridingSessionSoIcantOpenAnotherOne == true) {
        return {
            title:'Błąd krytyczny !',
            msg: 'Próbujesz wjechać na parking, a posiadasz trwającą sesję na innym nadrzędnym parkingu. Rozlicz i zamknij trwającą sesję',
        }
    }

    if (json?.userTryToGoOutFromOverridingParking_butDoesntHaveOverridingSessionActive == true) {
        return {
            title:'Błąd krytyczny !',
            msg: 'Próbujesz wyjechać z parkingu, mimo że nie wjechałeś na niego z użyciem naszej aplikacji - nie możemy zatem określić czasu trwania parkowania. Wyjaśnij sytuację z obsługą parkingu',
        }
    }

    if (json?.userTryToGoOutFromOverridingParking_butHaveToPay == true) {
        return {
            title:'Błąd krytyczny !',
            msg: 'Uwaga! Próbujesz wyjechać z parkingu nadrzędnego, lecz wciąż musisz uregulować należność za postój. Zapłać i spróbuj ponownie',
        }
    }

    if (
      json?.userScannedGoOutTagFromOverridingSession_butHisOverridingSessionIsAssignedToAnotherParkingThanTag == true
    ) {
        return {
            title:'Błąd krytyczny !',
            msg: 'Próbujesz wyjechać z parkingu nadrzędnego, lecz Twoja trwająca sesja jest przypisana do innego parkingu nadrzędnego.',
        }
    }
  };