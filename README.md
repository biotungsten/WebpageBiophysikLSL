# WebpageBiophysikLSL
This is the repository containing code for the web representation of the Biophysik AG at life-science-lab.org.

## Ideensammlung

* Beschreibung der AG
  * Beschhreibung des Diffusionprojekts
    * Verschiedene Aufbauten getestet 
      * Problem mit den Rändern bei den selber gefertigten Messzellen mit dem 3D Drucker
      * Auswahl nun Einmalküvetten (kein Austrocknen, keine Randprobleme)                               
    * Darstellung der ersten Ergebnisse
      * Erste Versuche ergaben schöne, ungestörte Diffusion (Bild von Küvette mit Probe)
      * Simulation von Diffusion (2 oder mehr verschiedenfarbige Moleküle, interaktive Diffusionskoeffiienten und FRAPen (?))
    * Zukunft des Projekts
      * mögliche use cases (hier evtl. Simulation zu Proteininteraktionen)
      * Es fehlen noch die Experimente und Auswertung mit einer geeigneten Kamera (Handy mit App)
  * Ideen für zukünftige Themen in der AG von Henri und Steffi

## Todos

- [ ] Create container HTML that can seemlessly be put into existing page structure
- [ ] Find out about techncal details (allowed libraries, stylesheets used, styleguides to follow, ...)
- [ ] Write text about AG work
- [ ] Make p5js code for simulation of diffusion
  - [ ] write UI code
  - [ ] implement simulation backend
  - [ ] implement FRAPing
  - [ ] implement interactive adjustment of diffusion coefficient
- [ ] Make p5js code for simulation of protein interaction
  - [ ] make UI code
  - [ ] extend simulation abckend by code for interaction
  - [ ] implement interactive adjustment of interaction strength
- [ ] Collect images for page
- [ ] Link to our existing analysis code on Github
  - [ ] make repo public (or make a public fork)
  - [ ] tidy up code
  - [ ] add minimal docs
