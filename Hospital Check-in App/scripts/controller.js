/**
 * Created by Tannerfish on 4/20/2017.
 *
 *
 */



    var patientModule = angular.module('patientsModule' , []);

    patientModule.controller('patientCtrl' , ['$scope', patientCtrl]);

    function patientCtrl($scope) {
        $scope.form = {};
        $scope.validation = {};

        $scope.patientList = patientModel.getAllPatients();

        $scope.CreateBtnClicked = function () {
            //validatate controls
            //get data from form controls and create new Patient
            if (_validateData($scope)) {
                //reason for Visit
                var reason = _reasonCon($scope);
                var smoke = _smokeCon($scope);
                patientModel.createPatient(
                    $scope.form.first,
                    $scope.form.initial,
                    $scope.form.last,
                    $scope.form.address,
                    $scope.form.city,
                    $scope.form.state,
                    $scope.form.zip,
                    $scope.form.phone1,
                    $scope.form.phone2,
                    $scope.form.phone3,
                    $scope.form.ssn,
                    $scope.form.dobM,
                    $scope.form.dobD,
                    $scope.form.dobY,
                    $scope.form.height1,
                    $scope.form.height2,
                    $scope.form.weight,
                    smoke,
                    reason
                );
                _clearInput($scope);
            }
        };

        $scope.EditBtnClicked = function (id) {
            // Using the id, fetch the correct record from the patientModel.
            var patient = patientModel.getPatient(id);
            //Populate all the controls on the edit form using values from the record.
            $scope.form.first = patient.first;
            $scope.form.initial = patient.initial;
            $scope.form.last = patient.last;
            $scope.form.address = patient.address;
            $scope.form.city = patient.city;
            $scope.form.state = patient.state;
            $scope.form.zip = patient.zip;
            $scope.form.phone1 = patient.phone1;
            $scope.form.phone2 = patient.phone2;
            $scope.form.phone3 = patient.phone3;
            $scope.form.ssn = patient.ssn;
            $scope.form.dobM = patient.dobM;
            $scope.form.dobD = patient.dobD;
            $scope.form.dobY = patient.dobY;
            $scope.form.height1 = patient.height1;
            $scope.form.height2 = patient.height2;
            $scope.form.weight = patient.weight;
            $scope.form.smoke = patient.smoke? "no" : "yes";
            $scope.form.id = patient.id;
            //loop to check the correct reason check boxes
            var reason = patient.reason;
            if (reason.search("Hurt") !== -1) {
                $scope.form.hurt = true;
            }
            if (reason.search("Sick") !== -1) {
                $scope.form.sick = true;
            }
            if (reason.search("Mental") !== -1) {
                $scope.form.mental = true;
            }
            if (reason.search("Mine") !== -1) {
                $scope.form.mine = true;
            }
            if (reason.search("Other") !== -1) {
                $scope.form.other = true;
            }

            //Hide the Create button
            $scope.form.createMode = false;
            $scope.showForm = true;
        };

        $scope.SaveBtnClicked = function () {
            //Validate input from all the controls.
            if (_validateData($scope)) {
                // Fetch the patient record from the patientModel.
                var patient = patientModel.getPatient($scope.form.id);
                // Copy the data from the form controls to the record in the model.
                patient.first = $scope.form.first;
                patient.initial = $scope.form.initial;
                patient.last = $scope.form.last;
                patient.address = $scope.form.address;
                patient.city = $scope.form.city;
                patient.state = $scope.form.state;
                patient.zip = $scope.form.zip;
                patient.phone1 = $scope.form.phone1;
                patient.phone2 = $scope.form.phone2;
                patient.phone3 = $scope.form.phone3;
                patient.ssn = $scope.form.ssn;
                patient.dobM = $scope.form.dobM;
                patient.dobD = $scope.form.dobD;
                patient.dobY = $scope.form.dobY;
                patient.height1 = $scope.form.height1;
                patient.height2 = $scope.form.height2;
                patient.weight = $scope.form.weight;
                patient.smoke = _smokeCon($scope);
                patient.reason = _reasonCon($scope);

                patientModel.updatePatient(patient.id, patient);
                // Reset the input form.
                _clearInput($scope);
            }
        };

        $scope.DeleteBtnClicked = function (id) {
            _clearInput($scope);
            var patient = patientModel.getPatient(id);
            if (patient === null) {
                alert("Patient with id " + id + " not found!");
                return;
            }

            if (!confirm("Are you sure you want to delete " + patient.first + patient.initial + "." + patient.last + "?")) {
                return;
            }

            //delete student from model
            if (!patientModel.deletePatient(id)) {
                alert("Unable to find patient ID " + id);
            }
        };

        $scope.ResetBtnClicked = function () {
            _clearInput($scope);
        };

        $scope.CreateNewBtnClicked = function () {
            $scope.showForm = true;
            $scope.form.createMode = true;
        };

        //***********Internal Functions *************************
        function _clearInput($scope) {
            $scope.form.first = "";
            $scope.form.initial = "";
            $scope.form.last = "";
            $scope.form.address = "";
            $scope.form.city = "";
            $scope.form.phone1 = "";
            $scope.form.phone2 = "";
            $scope.form.phone3 = "";
            $scope.form.ssn = "";
            $scope.form.weight = "";
            $scope.form.smoke = "";
            $scope.form.sick = "";
            $scope.form.hurt = "";
            $scope.form.mental = "";
            $scope.form.mine = "";
            $scope.form.other = "";
            $scope.form.state = "WA";
            $scope.form.dobM = "January";
            $scope.form.dobD = "1";
            $scope.form.dobY = "2017";
            $scope.form.height1 = "5";
            $scope.form.height2 = "9";

            //creating a new item or editing an existing item
            $scope.form.createMode = true;
            //tells page to show or hide the form
            $scope.showForm = false;

            $scope.validation.firsterror = null;
            $scope.validation.initialerror = null;
            $scope.validation.lasterror = null;
            $scope.validation.addresserror = null;
            $scope.validation.cityerror = null;
            $scope.validation.ziperror = null;
            $scope.validation.phoneerror = null;
            $scope.validation.ssnerror = null;
            $scope.validation.weighterror = null;
            $scope.validation.smokeerror = null;
            $scope.validation.reasonerror = null;
        }

        function _validateData($scope) {
            //check the value of each element in the form.
            var validated = true;
            //var form = document.forms.checkIn;
            if (!$scope.form.first)//if it is empty or if it is a number
            {
                $scope.validation.firsterror = "First name not given.";
                validated = false;
            }
            else
                $scope.validation.firsterror = null;

            if (!$scope.form.initial) {
                $scope.validation.initialerror = "Middle initial not given.";
                validated = false;
            }
            else
                $scope.validation.initialerror = null;

            if (!$scope.form.last) {
                $scope.validation.lasterror = "Last name not given.";
                validated = false;
            }
            else
                $scope.validation.lasterror = null;

            if (!$scope.form.address)//a number an be an address
            {
                $scope.validation.addresserror = "Address not given.";
                validated = false;
            }
            else
                $scope.validation.addresserror = null;

            if (!$scope.form.city) {
                $scope.validation.cityerror = "City not given.";
                validated = false;
            }
            else
                $scope.validation.cityerror = null;

            if (!parseInt($scope.form.zip))//if zip is empty or if it isNAN
            {
                $scope.validation.ziperror = "Valid Zip Code not given.";
                validated = false;
            }
            else
                $scope.validation.ziperror = null;
            //check all of the phone fields
            if (!$scope.form.phone1 || isNaN($scope.form.phone1) || !$scope.form.phone2 || isNaN($scope.form.phone2) || !$scope.form.phone3 || isNaN($scope.form.phone3)) {
                $scope.validation.phoneerror = "Valid Phone Number not given.";
                validated = false;
            }
            else
                $scope.validation.phoneerror = null;

            if (!parseInt($scope.form.ssn)) {
                $scope.validation.ssnerror = "Valid SSN not given.";
                validated = false;
            }
            else
                $scope.validation.ssnerror = null;

            if (!parseInt($scope.form.weight))//if weight is empty or not a number
            {
                $scope.validation.weighterror = "Valid weight not given.";
                validated = false;
            }
            else
                $scope.validation.weighterror = null;

            if (!$scope.form.smoke) {
                $scope.validation.smokeerror = "Please check one.";
                validated = false;
            }
            else
                $scope.validation.smokeerror = null;

            if (!$scope.form.sick && !$scope.form.hurt && !$scope.form.mental && !$scope.form.mine && !$scope.form.other) {
                $scope.validation.reasonerror = "Please check all that apply.";
                validated = false;
            }
            else
                $scope.validation.reasonerror = null;
            //if empty - display the error msg
            //return false
            //if passes right, return true
            return validated;
        }

//concatenates radio buttons for the table
        function _reasonCon($scope) {
            var reason = "N/A";
            var first = true;
            if ($scope.form.sick && first){
                reason = "Sick";
                first = false;
            }//no reasons yet
            if ($scope.form.hurt && first){
                reason = "Hurt"; //1 reason
                first = false;
            }
            else if($scope.form.hurt){
                reason = reason + ", Hurt"
            }
            if($scope.form.mental && first){
                reason = "Mental Illness";
                first = false;
            }
            else if ($scope.form.mental)//multiple reasons
                reason = reason + ", Mental Illness";
            if($scope.form.mine && first){
                reason = "Addicted to Minecraft";
                first = false;
            }
            else if ($scope.form.mine)
                reason = reason + ", Addicted to Minecraft";
            if($scope.form.other && first){
                reason = "Other";
                first = false;
            }
            else if ($scope.form.other)
                reason = reason + ", Other";
            return reason;
        }

//returns smoke value as string
        function _smokeCon($scope) {
            var smoke;
            smoke = $scope.form.smoke;
            return smoke;
        }

    }




