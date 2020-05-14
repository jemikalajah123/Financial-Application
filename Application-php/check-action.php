<?

$deposit = isset($_POST['deposit']) ? $_POST['deposit'] : '';
$rate = isset($_POST['rate']) ? $_POST['rate'] : '';
$start = date('Y-m-d', strtotime($_POST['start-date']));
$end =  date('Y-m-d', strtotime($_POST['end-date']));
$period = isset($_POST['period']) ? $_POST['period'] : '';


$ok = true;
$messages = array();

if ( !isset($deposit) || empty($deposit)){
    $ok = false;
    $messages[] = 'Deposit cannot be empty!';
}

if ( !isset($rate) || empty($rate)){
    $ok = false;
    $messages[] = 'Rate cannot be empty!';
}

if ( !isset($start) || empty($start)){
    $ok = false;
    $messages[] = 'Please click on the drop down and fix a start date!';
}
if ( !isset($end) || empty($end)){
    $ok = false;
    $messages[] = 'Please click on the drop down and fix an end date!';
}

if ( !isset($period) || empty($period)){
    $ok = false;
    $messages[] = 'Period cannot be empty!';
}
if($start === 'Invalid Date' && $end === 'Invalid Date'){
    $ok = false;
    $messages[] = 'Please enter a valid date!';
}

if ($ok){
    if( is_string($end) == true && is_string($start) == true){

        $ok = true;
        $messages [] = 'Parameters are okay!';
    }else{
        $ok = false;
        $messages [] = 'All inputs must be an integer!';
    }

}




echo json_encode(
    array(
        'ok' => $ok,
        'messages' => $messages
    )
    );



?>