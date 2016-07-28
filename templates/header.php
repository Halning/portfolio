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
          content="Hello, my name is Jeremy and I am a web and graphic designer. I am into clean, modern and usable design. My experience consists of both Photoshop design and coding. I generally code all my designs using component management systems such as drupal or wordpress, static html/css, and flash action script coding. I enjoy spending a lot of time creating original designs in Photoshop and exploring new programming techniques. The result is numerous icons, wallpapers, and wordpress themes, among other products. I'm also addicted to photography and I spend most of my free time taking pictures and exploring this form of art.">
    <meta name="author" content="Andrei Khomenko">
    <meta name="keywords"
          content="jeremy, sallee, graphisme, graphic, photoshop, logo, art, logotype, creation, inspiration, web, internet, layout, salleedesign, projet, project, work, travaux, web, facebook, twitter, création, creation, webdesign, wodpress, cms, webdesigner, print, identity, branding, professional">


    <!-- Mobile viewport optimized: j.mp/bplateviewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">


    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <link type="text/css" rel="stylesheet" href="../public/css/main.css"/>
</head>


<body>
<div class="header transparent clearfix in white">
    <ul class="nav nav-pills">
        <li class="active">
            <a href="index.php" class="pjax">Home</a>
        </li>
        <li>
            <a href="skils.php" class="pjax">Skils</a>
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
