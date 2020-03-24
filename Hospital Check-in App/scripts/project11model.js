/**
 * Created by Tannerfish on 2/8/2017.
 */
var patientModel = patientModel || (function () {
        var _patientList = [],
            nextPatientId = 1000;
        var _patient = function (first, initial, last, address, city, state, zip, phone1, phone2, phone3, ssn, dobM, dobD, dobY, height1, height2, weight, smoke, reason) {
            this.id = nextPatientId++;
            this.first = first;
            this.initial = initial;
            this.last = last;
            this.address = address;
            this.city = city;
            this.state = state;
            this.zip = zip;
            this.phone1 = phone1;
            this.phone2 = phone2;
            this.phone3 = phone3;
            this.ssn = ssn;
            this.dobM = dobM;
            this.dobD = dobD;
            this.dobY = dobY;
            this.height1 = height1;
            this.height2 = height2;
            this.weight = weight;
            this.smoke = smoke;
            this.reason = reason;
        };

        _patient.prototype = (function () {
            var _sortableName = function () {
                return this.last + ", " + this.first + " " + this.initial;
            };

            return {
                constructor: _patient,
                sortableName: _sortableName
            };
        })();


        var
            _getPatient = function (id) {
                for (k in _patientList) {
                    if (_patientList[k].id === id)
                        return _patientList[k];

                }
                return null;
            },
            _createPatient = function (first, initial, last, address, city, state, zip, phone1, phone2, phone3, ssn, dobM, dobD, dobY, height1, height2, weight, smoke, reason) {
                var newPatient = new _patient(
                    first, initial, last, address, city, state, zip, phone1, phone2, phone3, ssn, dobM, dobD, dobY, height1, height2, weight, smoke, reason);
                _patientList.push(newPatient);
                return newPatient;
            },

            _getAllPatients = function () {
                return _patientList;
            },

            _updatePatient = function (id, patient) {
                //find matching record
                var found = false;
                for (var i in _patientList) {
                    if (_patientList[i].id === id) {
                        found = true;
                        patient.id = id;
                        _patientList[i] = patient;
                        break;
                    }
                }

                return found;
            },
            _deletePatient = function (id) {
                var found = false;
                for (var x in _patientList) {
                    if (_patientList[x].id === id) {
                        found = true;
                        _patientList.splice(x, 1);
                    }
                }

                return found;

            };

        return {
            createPatient: _createPatient,
            updatePatient: _updatePatient,
            deletePatient: _deletePatient,
            getPatient: _getPatient,
            getAllPatients: _getAllPatients
        };
    })();
