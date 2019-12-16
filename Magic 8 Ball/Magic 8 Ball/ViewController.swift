//
//  ViewController.swift
//  Magic 8 Ball
//
//  Created by codeslinger on 9/13/19.
//  Copyright © 2019 tannercrosbyorndorff. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    var randomBallIndex : Int = 0

    let ballArray = ["ball1","ball2","ball3","ball4","ball5"]


    @IBOutlet weak var ballImage: UIImageView!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        updateImage()
    }

    func updateImage() {
        randomBallIndex = Int.random(in: 0 ... 4)
        ballImage.image = UIImage.init(named: ballArray[randomBallIndex])
    }

    @IBAction func askMe(_ sender: Any) {
        updateImage()
    }

    override func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
        updateImage()
    }
}

