import UIKit
let API_KEY = "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"
let prompt = "A cute baby sea otter"
func makePOSTRequest() {
    guard let url = URL(string: "https://api.openai.com/v1/images/generations") else {
        return
    }

    var request = URLRequest(url: url)

    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.setValue("Bearer \(API_KEY)", forHTTPHeaderField: "Authorization")
    let body: [String: AnyHashable] = [
        "prompt" : prompt,
        "n" : 10,     
    ]
    request.httpBody = try? JSONSeriaization.data(withJSONObject: body, options: .fragmentAllowed)

    let task = URLSession.shared.dataTask(with: request) { data, _, error in 
        guard let data = data, error == nil else {
            return
        }
        
        do {
            let response = try JSONSeriaization.jsonObject(with: data, options:.allowFragments)
            print("SUCESS: \(response)")
        }
        catch {
            print(error)
        }

    }
    task.resume()
}

makePOSTRequest()