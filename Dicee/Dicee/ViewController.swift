//
//  ViewController.swift
//  Dicee
//
//  Created by codeslinger on 9/12/19.
//  Copyright © 2019 tannercrosbyorndorff. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    var randomDiceIndex1: Int = 0
    var randomDiceIndex2: Int = 0

    let imageArray = ["dice1","dice2","dice3","dice4","dice5","dice6"]


    @IBOutlet weak var diceOne: UIImageView!
    @IBOutlet weak var diceTwo: UIImageView!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        updateDiceImages()
    }

    @IBAction func roll(_ sender: Any) {
        updateDiceImages()
    }

    override func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
        updateDiceImages()
    }

    func updateDiceImages() {
        randomDiceIndex1 = Int.random(in: 0 ... 5)
        randomDiceIndex2 = Int.random(in: 0 ... 5)

        diceOne.image = UIImage.init(named: imageArray[randomDiceIndex1])
        diceTwo.image = UIImage.init(named: imageArray[randomDiceIndex2])
    }
}

