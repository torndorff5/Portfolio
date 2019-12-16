//
//  Question.swift
//  Quizzler
//
//  Created by codeslinger on 9/17/19.
//  Copyright © 2019 London App Brewery. All rights reserved.
//

import Foundation


class Question {
    let text : String
    let answer : Bool
    init(text: String, correctAnswer: Bool){
        self.text = text
        self.answer = correctAnswer
    }
}
