<!DOCTYPE html>

<html lang="en">
<head>
    <?php if (isset($title)): ?>
        <title><?= htmlspecialchars($title) ?></title>
    <?php else: ?>
        <title>My Site</title>
    <?php endif ?>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="img/zerg.png" type="image/png">

    <meta name="description"
          content="Здравствуйте меня зовут Андрей. Я Full Stack программист. Я люблю кодить.">
    <meta name="author" content="Andrei Khomenko">
    <meta name="keywords"
          content="andrei, khomenko, angular, php, jquery, javascript, cms, gulp, bootstrap, front-end, web, internet, layout, salleedesign, projet, project, work,  professional">


    <!-- Mobile viewport optimized: j.mp/bplateviewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">


    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="../node_modules/bootstrap/dist/css/bootstrap.min.css"></script>
    <link type="text/css" rel="stylesheet" href="dist/css/app.min.css"/>
</head>


<body>
<div class="header transparent clearfix in white">
    <ul class="nav nav-pills">
        <li class="active">
            <a href="index.php" class="pjax">Home</a>
        </li>
        <li>
            <a href="skils.php" class="pjax">Skills</a>
        </li>
        <li>
            <a href="projects.php" class="pjax">Work</a>
        </li>
        <li>
            <a href="contact.php" class="pjax">Контакты</a>
        </li>
    </ul>
</div>

<div id="pjax-container">
