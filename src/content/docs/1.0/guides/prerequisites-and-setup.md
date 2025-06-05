---
title: Prerequisites and Setup
description: Learning important background skills, downloading and installing
  MESA and its dependencies, and setting up your environment.
slug: 1.0/guides/prerequisites-and-setup
---

Learning important background skills, downloading and installing MESA and its dependencies, and setting up your environment.

## Prerequisites

Before you start to learn MESA, you really should have a good understanding of the topics below. Note that someone starting from scratch will likely need to dedicate a substantial amount of time to be comfortable with these topics. If you're already fairly seasoned with computational science and stellar astrophysics, just skim over these topics and make sure you are comfortable with the concepts and tools.

### Command Line

You should be comfortable working in a command line environment. In these guides, I'll be using the `zsh` shell, which is the default shell on macOS, but it is largely compliant with `bash` and other POSIX shells. Chances are that if you are knowledgable enough to prefer a different shell, you are also knowledgable enough to adapt the commands in these guides to your preferred shell.

In particular, you should be comfortable with the following command and concepts:

* `cd` - change directory
* `ls` - list files in a directory
* `cp` - copy files
* `mv` - move files
* `rm` - remove files
* environment variables - how to set and use them
* basic shell scripting - how to write and run simple shell scripts

If you are not comfortable with these concepts, I recommend you work through the excellent tutorials from Software Carpentry on [the Unix shell](https://swcarpentry.github.io/shell-novice/). These tutorials are designed to be accessible to beginners in computational science and will give you a solid foundation in working with the command line.

### Text Editors

Find a text editor that you are comfortable with. If you will be running MESA remotely, you might consider a terminal-based editor like `nano` (austere but simple) or `vim`/`emacs` (feature-rich but a steep learning curve). If you will be running MESA locally, you might prefer a graphical editor like [VS Code](https://code.visualstudio.com), or [Sublime Text](https://www.sublimetext.com). I'll be using [VS Code](https://code.visualstudio.com) in these guides (and its asscociated `code` command line tool for opening files and directories), but you can use any editor you like.

We'll be working with Fortran files a lot, so whatever editor you choose, it's worth taking the time to set up automatic syntax highlighting for Fortran files (`.f`, `.f90`, `.inc`, and files beginning with `inlist`). Fortran is not a very popular language these days, so you may need to search for a plugin or extension for your editor to get syntax highlighting working. If you are using VS Code, I recommend the [Modern Fortran](https://marketplace.visualstudio.com/items?itemName=hansec.fortran-modern) extension and then setting the following file associations in your settings:

***

| Item | Value|
|------|------|
|inlist|FortranFreeForm|
|inlist\*|FortranFreeForm|
|*.dek|FortranFreeForm|
|*.inc|FortranFixedForm|
|*.defaults|FortranFreeForm|
|*.list|FortranFreeForm|
------------------------

Other text editors have similar abilities to set default file associations. I strongly recommend you take the time to set this up, as automatic syntax highlighting will make it easier to read and debug Fortran code and inlist files.

### Stellar Structure and Evolution

While you don't need to be an expert in stellar structure an evolution, I think you'll find that some familiarity with the basic concepts and defintions will be essential to understanding MESA (and these guies). I recommend the following resources:

* First couple of chapters of [Stellar Interiors](https://link.springer.com/book/10.1007/978-1-4419-9110-2). Chapter 2, in particular, gives a nice narrative overview of the basic concepts and definitions without getting bogged down in too much mathematical detail.
* [Stellar Structure and Evolution](https://link.springer.com/book/10.1007/978-3-642-30304-3) by Kippenhahn, Weigert, and Weiss. This is a classic, but it's hard to recommend it as a "quick start" since it is so comprehensive. If you are looking for a more in-depth treatment, this is a great resource.
* [Stellar Astrophysics](https://web.pa.msu.edu/people/ebrown/docs/stellar-notes.pdf) by Ed Brown. These very polished "notes" are for students in the Michigan State graduate astrophysics course, but since they are written by a former MESA developer, they even come with MESA exercises!

### Fortran, but not Really

MESA is written in modern Fortran, but you don't need to be an expert in Fortran to use it. In fact, I don't recommend you spend any time just yet getting familiar with it, as I will introduce you to the bits you need as they arise in these guides. We can actually get pretty far without any Fortran, and with just a bit of syntax, you can virtually all of the utility of MESA.

## Downloading and Installing MESA

The [MESA Documentaion](https://docs.mesastar.org/en/latest/) has a great guide on [downloading and installing MESA](https://docs.mesastar.org/en/latest/installation.html). Follow that guide in its entirety to downloand and install MESA and its dependencies.

Once you've verified that MESA is installed correctly, you are ready to start using it!
