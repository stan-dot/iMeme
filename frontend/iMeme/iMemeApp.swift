//
//  iMemeApp.swift
//  iMeme
//
//  Created by Folademilade Oyeleke on 05/11/2022.
//

import SwiftUI

@main
struct iMemeApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
